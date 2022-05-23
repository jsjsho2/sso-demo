import React from 'react'
import axios from "axios";
import GetData from "../ajax/GetData";


const contextPath = '/raon-demo-cs';
const Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }

        return output;
    },
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    },
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        let c1, c2, c3;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return string;
    }
}

export function createUuid() {
    function s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function requiredCheck(value) {
    const check = (value === null || value === undefined || value === '' || value.length === 0) ? true : false
    return check;
}

export function logout(history) {
    localStorage.setItem('userId', '');
    localStorage.setItem('userName', '');
    localStorage.setItem('ssoToken', '');
    history.push(`${contextPath}/`);
}

export function goMain(history) {
    history.push(`${contextPath}/Main`);
}

export async function setConf() {
    const WAS_BridgeAddress = "127.0.0.1"; // ssobridge IP or Domain(실제로 사용할 때는 서버 루프백 주소가 아닌 서버 도메인 또는 IP주소를 입력해야한다.)
    const WAS_Path = "nxTest"; // ex) "/sites/common"
    const WAS_BridgePort = "8080";
    const secureChannel = "false"; //ssl
    const connectTimeout = "3000"; //miliseconds // 0으로 설정하면 연결이 완료될 때까지 기다린다.
    const encodeUtf8 = "false";
    const WAS_BridgeURL = "http://" + WAS_BridgeAddress + WAS_Path + "/ssoBridge.jsp"; // Do not modify by dyhwang

    const paramsBase64 = Base64.encode(`bridgeaddress=${WAS_BridgeURL}^bridgeport=${WAS_BridgePort}^connecttimeout=${connectTimeout}^securechannel=${secureChannel}^encodeutf8=${encodeUtf8}`);
    const url = 'http://127.0.0.1:17007/setConf';

    await axios.get(url, {params: {params: paramsBase64}})
        .then(function (rs) {
            let response = rs.data.replace("(", "").replace(")", "").trim();
            console.log(`setConf: ${JSON.parse(response).json.message}`)
        })
        .catch(function (error) {
            alert('[ERROR] CS module Set Config ERROR');
        });
}

export async function setToken(tokenName, tokenValue) {
    const url = 'http://127.0.0.1:17007/setToken';
    const paramsBase64 = Base64.encode(`tokenname=${tokenName}^tokenvalue=${tokenValue}`);

    await axios.get(url, {params: {params: paramsBase64}})
        .then(function (rs) {
            let response = rs.data.replace("(", "").replace(")", "").trim();
            console.log(`setToken: ${JSON.parse(response).json.message}`)
        })
        .catch(function (error) {
            alert('[ERROR] CS module Set Token ERROR');
        });
}

export async function getToken(tokenName) {
    const url = 'http://127.0.0.1:17007/getToken';
    const paramsBase64 = Base64.encode(`tokenname=${tokenName}`);
    let result = '';

    await axios.get(url, {params: {params: paramsBase64}})
        .then(function (rs) {
            let response = rs.data.replace("(", "").replace(")", "").trim();
            console.log(`getToken: ${JSON.parse(response).json.message}`)
            result = JSON.parse(response).json.message;
        })
        .catch(function (error) {
            alert('[ERROR] CS module Get Token ERROR');
        });

    return result;
}

export function runApp(path, argument, currDir) {
    const paramsBase64 = Base64.encode(`path=${path}^argument=${argument}^currdir=${currDir}`);
    const url = 'http://127.0.0.1:17007/runApp';

    axios.get(url, {params: {params: paramsBase64}})
        .then(function (rs) {
            let response = rs.data.replace("(", "").replace(")", "").trim();
            console.log(`runApp: ${JSON.parse(response).json.message}`)
        })
        .catch(function (error) {
            alert('[ERROR] CS module Run App ERROR');
        });
}