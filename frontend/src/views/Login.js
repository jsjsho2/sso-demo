import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import '../css/frame012349.css'
import '../css/loginStyle.css'
import GetData from "../ajax/GetData";
import * as common from "../components/CommonFunction";

const contextPath = '/raon-demo-cs';

const Login = () => {

    useEffect(() => {
        common.setConf();
    }, []);

    let history = useHistory();

    const [inputs, setInputs] = useState({
        userId: '',
        userPw: '',
    });
    const onChange = (e) => {
        const {name, value} = e.target;

        const nextInputs = {
            ...inputs,
            [name]: value,
        };
        setInputs(nextInputs)
    };

    const loginCheck = async () => {
        const url = "/REST/userCheck";
        const data = await GetData(url, inputs);

        if (data === undefined) {
            alert('[ERROR] 서버 통신 오류');
            return false;
        } else {
            if (data.nResult >= 0) {
                const userInfo = JSON.parse(data.userInfo);
                localStorage.setItem("userId", userInfo.ID);
                localStorage.setItem("userName", userInfo.NAME);
                localStorage.setItem("ssoToken", data.ssoToken);
                localStorage.setItem("lastLogin", data.lastLogin);

                await common.setToken(`ssotoken`, data.ssoToken);

                history.push(`${contextPath}/Main`);
            } else {
                alert(data.detail);
                return false;
            }
        }
    }

    return (
        <>
            <div>
                <div className="frame012349-container">
                    <div className="frame012349-frame012349" style={{width: '100%', height: '100%'}}>
                        <div className="frame012349-layout2351">
                            <div className="frame012349-l-o-g-o-touch-en-wiseaccess43180">
                                <img
                                    alt="Vector43181"
                                    src={`${process.env.PUBLIC_URL}/img/vector43181-4uur.svg`}
                                    className="frame012349-svg"
                                />
                                <img
                                    alt="Vector43182"
                                    src={`${process.env.PUBLIC_URL}/img/vector43182-nmas.svg`}
                                    className="frame012349-svg01"
                                />
                                <div className="frame012349-group43183">
                                    <div className="frame012349-group43184">
                                        <img
                                            alt="Vector43188"
                                            src={`${process.env.PUBLIC_URL}/img/vector43188-npii.svg`}
                                            className="frame012349-svg02"
                                        />
                                    </div>
                                    <img
                                        alt="Vector43189"
                                        src={`${process.env.PUBLIC_URL}/img/vector43189-cv2.svg`}
                                        className="frame012349-svg03"
                                    />
                                </div>
                                <img
                                    alt="Vector43190"
                                    src={`${process.env.PUBLIC_URL}/img/vector43190-8p1.svg`}
                                    className="frame012349-svg04"
                                />
                                <img
                                    alt="Vector43191"
                                    src={`${process.env.PUBLIC_URL}/img/vector43191-wzmm.svg`}
                                    className="frame012349-svg05"
                                />
                                <img
                                    alt="Vector43192"
                                    src={`${process.env.PUBLIC_URL}/img/vector43192-6mut.svg`}
                                    className="frame012349-svg06"
                                />
                                <img
                                    alt="Vector43193"
                                    src={`${process.env.PUBLIC_URL}/img/vector43193-izw.svg`}
                                    className="frame012349-svg07"
                                />
                                <img
                                    alt="Vector43194"
                                    src={`${process.env.PUBLIC_URL}/img/vector43194-yjk.svg`}
                                    className="frame012349-svg08"
                                />
                                <img
                                    alt="Vector43195"
                                    src={`${process.env.PUBLIC_URL}/img/vector43195-ip2r.svg`}
                                    className="frame012349-svg09"
                                />
                                <img
                                    alt="Vector43196"
                                    src={`${process.env.PUBLIC_URL}/img/vector43196-0vyl.svg`}
                                    className="frame012349-svg10"
                                />
                                <img
                                    alt="Vector43197"
                                    src={`${process.env.PUBLIC_URL}/img/vector43197-4b4.svg`}
                                    className="frame012349-svg11"
                                />
                                <img
                                    alt="Vector43198"
                                    src={`${process.env.PUBLIC_URL}/img/vector43198-mrm.svg`}
                                    className="frame012349-svg12"
                                />
                                <img
                                    alt="Vector43199"
                                    src={`${process.env.PUBLIC_URL}/img/vector43199-o51v.svg`}
                                    className="frame012349-svg13"
                                />
                            </div>
                            <div className="frame012349-group3266347">
                                <div className="frame012349-footer2418"></div>
                                <span className="frame012349-text">
                                    <span className="frame012349-text01">COPYRIGHT</span>
                                    <span className="frame012349-text02">©</span>
                                    <span className="frame012349-text03">
                                    RAONSECURE. ALL RIGHTS RESERVED.
                                    </span>
                                </span>
                            </div>
                            <div className="frame012349-group3286350">
                                <img
                                    alt="Rectangle522423"
                                    src={`${process.env.PUBLIC_URL}/img/rectangle522423-tcbb.svg`}
                                    className="frame012349-svg14"
                                />
                                <div className="frame012349-group3276348" onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        loginCheck();
                                    }
                                }}>
                                    <div className="frame012349-group1482425">
                                        <div className="frame012349-groupvertical2427">
                                            <div className="frame012349-group49i242711633">
                                                <div className="frame012349-textfieldvariation-text-only-i242711622">
                                                    <div className="frame012349-textfieldsbase-i242711622107193">
                                                        <div className="frame012349-input-i242711622107193107516">
                                                            <input className="frame012349-group48i242711622107193107491"
                                                                   placeholder={'ID'}
                                                                   name={'userId'}
                                                                   onChange={onChange}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="frame012349-text06">
                                                    <span className="frame012349-text07">아이디</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="frame012349-groupvertical43209">
                                            <div className="frame012349-group49i4320911633">
                                                <div className="frame012349-textfieldvariation-text-only-i4320911622">
                                                    <div className="frame012349-textfieldsbase-i4320911622107193">
                                                        <div className="frame012349-input-i4320911622107193107516">
                                                            <input
                                                                type={'password'}
                                                                className="frame012349-group48i4320911622107193107491"
                                                                placeholder={'PASSWORD'}
                                                                name={'userPw'}
                                                                onChange={onChange}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="frame012349-text10">
                                                    <span className="frame012349-text11">패스워드</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="frame012349-size-xlarge2431">
                                        <button className="frame012349-buttons-primary-i243111146183"
                                                style={{cursor: 'pointer'}}
                                                onClick={loginCheck}>
                                            <div className="frame012349-surface-i24311114618311088202">
                                                <img
                                                    alt="SurfaceI2431111461831108820211088089"
                                                    src={`${process.env.PUBLIC_URL}/img/surfacei2431111461831108820211088089-mi9e-200h.png`}
                                                    className="frame012349-image"
                                                />
                                                <span className="frame012349-text12">
                                                    <span className="frame012349-text13">로그인</span>
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="frame012349-r-a-o-n33116">
                                        <div className="frame012349-group33117">
                                            <img
                                                alt="Vector33118"
                                                src={`${process.env.PUBLIC_URL}/img/vector33118-x7.svg`}
                                                className="frame012349-svg15"
                                            />
                                            <img
                                                alt="Group33119"
                                                src={`${process.env.PUBLIC_URL}/img/group33119-3gkl.svg`}
                                                className="frame012349-image1"
                                            />
                                            <img
                                                alt="Vector33121"
                                                src={`${process.env.PUBLIC_URL}/img/vector33121-tpdu.svg`}
                                                className="frame012349-svg16"
                                            />
                                            <img
                                                alt="Vector33122"
                                                src={`${process.env.PUBLIC_URL}/img/vector33122-7zxr.svg`}
                                                className="frame012349-svg17"
                                            />
                                            <img
                                                alt="Vector33123"
                                                src={`${process.env.PUBLIC_URL}/img/vector33123-hq2r.svg`}
                                                className="frame012349-svg18"
                                            />
                                            <div className="frame012349-group33124">
                                                <img
                                                    alt="Group33125"
                                                    src={`${process.env.PUBLIC_URL}/img/group33125-yt6d.svg`}
                                                    className="frame012349-image2"
                                                />
                                                <img
                                                    alt="Vector33128"
                                                    src={`${process.env.PUBLIC_URL}/img/vector33128-25a.svg`}
                                                    className="frame012349-svg19"
                                                />
                                                <img
                                                    alt="Vector33129"
                                                    src={`${process.env.PUBLIC_URL}/img/vector33129-set8.svg`}
                                                    className="frame012349-svg20"
                                                />
                                                <img
                                                    alt="Vector33130"
                                                    src={`${process.env.PUBLIC_URL}/img/vector33130-tebe.svg`}
                                                    className="frame012349-svg21"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img
                                alt="Rectangle556351"
                                src={`${process.env.PUBLIC_URL}/img/rectangle556351-ww2h-700w.png`}
                                className="frame012349-image3"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;