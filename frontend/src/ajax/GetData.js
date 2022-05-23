import axios from "axios";

const contextPath = '/raon-demo-cs';

const GetData = async (url, condition = {}) => {
    let data = [];

    url = `${contextPath}${url}`

    await axios.post(url, condition, {
        headers: {
            'Content-Type': 'application/json',
            'userId': encodeURIComponent(localStorage.getItem("userId")),
            'userName': encodeURIComponent(localStorage.getItem("userName")),
            "Access-Control-Allow-Origin": "*",
        }
    })
        .then(function (rs) {
            data = rs.data;
        })
        .catch(function (error) {
            alert('[ERROR] 오류가 계속 발생하면 관리자에게 문의바랍니다');
            data = false;
        });

    return data;
};

export default GetData;
