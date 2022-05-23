package com.raon.demo.controller;

import WiseAccess.SSO;
import WiseAccess.SsoAuthInfo;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.raon.demo.common.CommonFunction;
import com.raon.demo.data.FixVariable;
import com.raon.demo.db.DBConnect;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
@RequestMapping(value = "/REST")
public class RestController extends CommonFunction {

    DBConnect dbConnect = new DBConnect();

    @PostMapping(value = "/userCheck", produces = "application/text; charset=UTF-8")
    @ResponseBody
    public String userCheck(@RequestBody Map map, HttpServletRequest request) {

        String id = map.get("userId").toString();
        String pw = map.get("userPw").toString();
        String sApiKey = FixVariable.getSsoKey();
        String engineIP = FixVariable.getSsoIp();
        int enginePort = FixVariable.getSsoPort();
        String detail = "";

        JsonObject obj = new JsonObject();

        int nResult = -1;

        if (id != null && pw != null) {
            SSO sso = new SSO(sApiKey);
            sso.setHostName(engineIP);
            sso.setPortNumber(enginePort);
            sso.setCharacterSet("euc-kr");

            SsoAuthInfo authInfo = new SsoAuthInfo();
            authInfo = sso.authID(id, pw, true, request.getRemoteAddr()); // 사용자 아이디 및 비밀번호 정보로 인증
            nResult = sso.getLastError();
            obj.addProperty("nResult", nResult);

            if (nResult >= 0) {
                Date date = authInfo.getLastLogonTimeByDate();
                java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                sso.putValue("lastLogin", format.format(date));

                String token = sso.makeToken(3, authInfo.getToken(), FixVariable.getGid(), request.getRemoteAddr());

                obj.addProperty("lastLogin", format.format(date));
                obj.addProperty("ssoToken", token);
                obj.addProperty("userInfo", dbConnect.getDataOne(
                        "SELECT * FROM WA3_USER WHERE ID = '" + id + "'").toString());
            } else {
                switch (nResult) {
                    case -1205:
                        detail = "잘못된 인증토큰입니다. (" + nResult + ")";
                        break;
                    case -2902:
                        detail = "세션만료 되었습니다. (" + nResult + ")";
                        break;
                    case -2434:
                        detail = "패스워드가 틀렸습니다. (" + nResult + ")";
                        break;
                    case -3034:
                        detail = "등록되지 않은 사용자입니다. (" + nResult + ")";
                        break;
                    default:
                        detail = "사용자 인증 오류입니다. (" + nResult + ")";
                        break;
                }
                obj.addProperty("detail", detail);
            }
        }

        return obj.toString();
    }

    @PostMapping(value = "/tokenCheck", produces = "application/text; charset=UTF-8")
    @ResponseBody
    public String tokenCheck(@RequestBody Map map, HttpServletRequest request) {

        return tokenCheck(map.get("ssoToken").toString(), request).toString();
    }

    @PostMapping(value = "/getAuth", produces = "application/text; charset=UTF-8")
    @ResponseBody
    public String getAuth(@RequestBody Map<String, String> map, HttpServletRequest request) {

        String sApiKey = FixVariable.getSsoKey();
        String engineIP = FixVariable.getSsoIp();
        int enginePort = FixVariable.getSsoPort();

        SSO sso = new SSO(sApiKey);
        sso.setHostName(engineIP);
        sso.setPortNumber(enginePort);
        sso.setCharacterSet("euc-kr");

        sso.verifyToken(map.get("ssoToken"));
        String id = sso.getValueUserID();
        JsonObject auth = dbConnect.getDataOne(
                "SELECT * " +
                        "FROM WA3_UACL " +
                        "WHERE TARGET_ID = '" + id + "' " +
                        "AND IS_USE = 1 " +
                        "AND SERVICE_ID = '" + map.get("serviceId") + "'");

        return auth.toString();
    }
}
