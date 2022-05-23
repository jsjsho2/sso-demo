import React, {useEffect, useState} from 'react'
import '../css/frame022283.css'
import '../css/mainStyle.css'
import '../css/groupwareStyle.css'
import {useHistory} from "react-router-dom";
import * as common from '../components/CommonFunction';
import GetData from "../ajax/GetData";

const contextPath = '/raon-demo-cs';

const Groupware = () => {

    const [userName, setUserName] = useState('');
    const [lastLogin, setLastLogin] = useState('');
    let history = useHistory();

    useEffect(() => {
        const localToken = localStorage.getItem("ssoToken");

        if (localToken !== null && localToken !== '') {
            tokenCheck(history, localToken);
        } else {
            common.getToken('ssotoken')
                .then(r => {
                    if (r === '' || r === null || r === 'null') {
                        history.push(`${contextPath}/`);
                    } else {
                        localStorage.setItem("ssoToken", r);
                        common.setConf()
                            .then(() => {
                                console.log('demooooooo')
                                tokenCheck(history, r);
                            });
                    }
                })
        }
    }, []);

    function tokenCheck(history, token) {
        GetData("/REST/tokenCheck", {ssoToken: token})
            .then((rs) => {
                if (rs.nResult >= 0) {
                    const userInfo = JSON.parse(rs.userInfo);
                    localStorage.setItem("userId", userInfo.ID);
                    localStorage.setItem("userName", userInfo.NAME);
                    localStorage.setItem("lastLogin", rs.lastLogin);
                    setUserName(userInfo.NAME);
                    setLastLogin(rs.lastLogin);

                } else if (rs.nResult === -9404) {
                    alert('다른 PC에서 로그인하였습니다. 기존로그인은 종료됩니다.');
                } else {
                    alert('token 검증 오류. 로그인 페이지로 리다이렉트됩니다.');
                    history.push(`${contextPath}/`);
                }
            });
    }

    return (
        <>
            <div className="frame022283-container">
                <div className="frame022283-frame022283">
                    <img
                        alt="Rectangle542285"
                        src={`${process.env.PUBLIC_URL}/img/rectangle542285-ahrp-2000w.png`}
                        className="frame022283-image"
                    />
                    <div className="frame022283-u-idashboard012286">
                        <div className="frame022283-box022287">
                            <img className="frame022283-image01"/>
                        </div>
                        <div className="frame022283-maskgroup6383">
                            <img
                                alt="Group3296380"
                                src={`${process.env.PUBLIC_URL}/img/group3296380-zaow.svg`}
                                className="frame022283-image02"
                            />

                            <div className={'editor-wrapper groupware-wrapper'}>
                                <div className={'pageTitle'}>
                                    그룹웨어
                                </div>

                                <table>
                                    <tr>
                                        <td rowSpan={2}>
                                            <div className={'user-info-wrapper'}>
                                                <div className={'user-info'}>
                                                    <img
                                                        src={'https://thumb.ac-illust.com/c1/c1607d6f2ba2f9eb5d6f6e5e50bd01e3_t.jpeg'}/>
                                                </div>
                                                <div className={'user-info'}>
                                                    {userName}<br/>
                                                    PRO<br/>
                                                    계정관리기술팀
                                                </div>

                                                <table>
                                                    <tr>
                                                        <td>결재할 문서</td>
                                                        <td><b>0</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td>오늘의 일정정</td>
                                                        <td><b>0</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td>내 예약/대여 현황</td>
                                                        <td><b>0</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td>참여할 설문</td>
                                                        <td><b>0</b></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={'sub-divs'}>
                                                <div>받은메일함</div>
                                                <table className={'groupware-table'}>
                                                    <tr>
                                                        <td>
                                                            라온인1
                                                        </td>
                                                        <td>
                                                            SSO 회의록 송부드립니다.<br/>
                                                            <div
                                                                style={{color: '#9e9e9e'}}>2022-04-11
                                                                11:13
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            라온인2
                                                        </td>
                                                        <td>
                                                            SSO 관련 문의드립니다.<br/>
                                                            <div
                                                                style={{color: '#9e9e9e'}}>2022-03-18
                                                                18:42
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            라온인3
                                                        </td>
                                                        <td>
                                                            [SHWEB] 프로젝트 관련 검토 요청드립니다.<br/>
                                                            <div
                                                                style={{color: '#9e9e9e'}}>2022-02-15
                                                                16:01
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={'sub-divs'}
                                                 style={{marginTop: '56px'}}>
                                                <div>전사게시판</div>
                                                <table className={'groupware-table'}>
                                                    <tr>
                                                        <td>
                                                            [공유] 정보보안의 중요성<br/>
                                                            <div
                                                                style={{color: '#9e9e9e'}}>2022-04-11
                                                                09:10
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            [무료나눔] 1달 사용한 기계식키보드 무료로 나눔합니다<br/>
                                                            <div
                                                                style={{color: '#9e9e9e'}}>2022-04-01
                                                                11:35
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            [공지] 각 층별 휴게실에 천혜향 2박스씩 놓아두었습니다. 마음껏
                                                            드세요<br/>
                                                            <div
                                                                style={{color: '#9e9e9e'}}>2022-03-27
                                                                10:01
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="frame022283-header2347">
                        <div className="frame022283-frame260i234711167060">
                            <div className="frame022283-frame-i234711167219">
                                <span className="frame022283-text10">
                                    <span className="frame022283-text11" style={{marginLeft: '-20px'}}>
                                        {userName}님 환영합니다. {lastLogin}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="frame022283-group3256356" style={{cursor: 'default'}}>
                        <img
                            alt="Vector6357"
                            src={`${process.env.PUBLIC_URL}/img/vector6357-ifh4.svg`}
                            className="frame022283-svg11"
                        />
                        <img
                            alt="Vector6358"
                            src={`${process.env.PUBLIC_URL}/img/vector6358-4czk.svg`}
                            className="frame022283-svg12"
                        />
                        <div className="frame022283-group6359">
                            <div className="frame022283-group6360">
                                <img
                                    alt="Vector6364"
                                    src={`${process.env.PUBLIC_URL}/img/vector6364-wvr.svg`}
                                    className="frame022283-svg13"
                                />
                            </div>
                            <img
                                alt="Vector6365"
                                src={`${process.env.PUBLIC_URL}/img/vector6365-gu18.svg`}
                                className="frame022283-svg14"
                            />
                        </div>
                        <img
                            alt="Vector6366"
                            src={`${process.env.PUBLIC_URL}/img/vector6366-n8j.svg`}
                            className="frame022283-svg15"
                        />
                        <img
                            alt="Vector6367"
                            src={`${process.env.PUBLIC_URL}/img/vector6367-p22.svg`}
                            className="frame022283-svg16"
                        />
                        <img
                            alt="Vector6368"
                            src={`${process.env.PUBLIC_URL}/img/vector6368-8ugp.svg`}
                            className="frame022283-svg17"
                        />
                        <img
                            alt="Vector6369"
                            src={`${process.env.PUBLIC_URL}/img/vector6369-jvwt.svg`}
                            className="frame022283-svg18"
                        />
                        <img
                            alt="Vector6370"
                            src={`${process.env.PUBLIC_URL}/img/vector6370-3pg.svg`}
                            className="frame022283-svg19"
                        />
                        <img
                            alt="Vector6371"
                            src={`${process.env.PUBLIC_URL}/img/vector6371-88z.svg`}
                            className="frame022283-svg20"
                        />
                        <img
                            alt="Vector6372"
                            src={`${process.env.PUBLIC_URL}/img/vector6372-9yv8.svg`}
                            className="frame022283-svg21"
                        />
                        <img
                            alt="Vector6373"
                            src={`${process.env.PUBLIC_URL}/img/vector6373-obhn.svg`}
                            className="frame022283-svg22"
                        />
                        <img
                            alt="Vector6374"
                            src={`${process.env.PUBLIC_URL}/img/vector6374-7vt.svg`}
                            className="frame022283-svg23"
                        />
                        <img
                            alt="Vector6375"
                            src={`${process.env.PUBLIC_URL}/img/vector6375-tnom.svg`}
                            className="frame022283-svg24"
                        />
                    </div>
                    <div className="frame022283-footer2348">
                    <span className="frame022283-text14">
                        <span className="frame022283-text15"></span>
                        <span className="frame022283-text16">COPYRIGHT</span>
                        <span className="frame022283-text17">©</span>
                        <span className="frame022283-text18">
                          RAONSECURE. ALL RIGHTS RESERVED.
                        </span>
                    </span>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Groupware;