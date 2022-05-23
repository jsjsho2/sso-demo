package com.raon.demo.common;

import WiseAccess.SSO;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.raon.demo.data.FixVariable;
import com.raon.demo.db.DBConnect;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

public class CommonFunction {

    DBConnect dbConnect = new DBConnect();

    public JsonObject tokenCheck(String token, HttpServletRequest request) {
        JsonObject obj = new JsonObject();

        String sApiKey = FixVariable.getSsoKey();
        String engineIP = FixVariable.getSsoIp();
        int enginePort = FixVariable.getSsoPort();
        int nResult = -1;
        String id = "";

        SSO sso = new SSO(sApiKey);
        sso.setHostName(engineIP);
        sso.setPortNumber(enginePort);

        nResult = sso.verifyToken(token);

        if (nResult >= 0) {
            id = sso.getValueUserID();
            java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            obj.addProperty("lastLogin", sso.getValue("lastLogin"));

            JsonArray uacl = dbConnect.getData(
                    "SELECT * " +
                            "FROM WA3_UACL " +
                            "WHERE TARGET_ID = '" + id + "' " +
                            "AND IS_USE = 1");
            obj.addProperty("uacl", uacl.toString());
            obj.addProperty("userInfo", dbConnect.getDataOne(
                    "SELECT * FROM WA3_USER WHERE ID = '" + id + "'").toString());
        }

        obj.addProperty("nResult", nResult);
        return obj;
    }
}
