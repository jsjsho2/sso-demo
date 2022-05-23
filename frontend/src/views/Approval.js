import React, {useEffect, useState} from 'react'
import '../css/frame022283.css'
import '../css/mainStyle.css'
import '../css/approvalStyle.css'
import {useHistory} from "react-router-dom";
import * as common from '../components/CommonFunction';
import 'react-quill/dist/quill.snow.css';
import GetData from "../ajax/GetData";

const contextPath = '/raon-demo-cs';
const serviceId = 'aaaaaad';

const Approval = () => {

    const [createAuth, setCreateAuth] = useState(false);
    let history = useHistory();

    useEffect(() => {
        const localToken = localStorage.getItem("ssoToken");

        if (localToken !== null && localToken !== '') {
            GetData("/REST/tokenCheck", {ssoToken: localToken})
                .then((rs) => {
                    if (rs.nResult >= 0) {

                        GetData("/REST/getAuth", {serviceId: serviceId, ssoToken: localToken})
                            .then((rs) => {
                                const p = rs.PERMISSION;
                                if (p.indexOf("C") !== -1) {
                                    setCreateAuth(true);
                                }
                            });

                    } else if (rs.nResult === -9404) {
                        alert('다른 PC에서 로그인하였습니다. 기존로그인은 종료됩니다.');
                    } else {
                        alert('token 검증 오류. 로그인 페이지로 리다이렉트됩니다.');
                        history.push(`${contextPath}/`);
                    }
                });
        } else {
            history.push(`${contextPath}/`);
        }
    }, []);

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
                            <img
                                alt="box02I228711135546"
                                src={`${process.env.PUBLIC_URL}/img/box02i228711135546-jlaj-1400w.png`}
                                className="frame022283-image01"
                            />
                        </div>
                        <div className="frame022283-maskgroup6383">
                            <img
                                alt="Group3296380"
                                src={`${process.env.PUBLIC_URL}/img/group3296380-zaow.svg`}
                                className="frame022283-image02"
                            />

                            <div className={'editor-wrapper approval-wrapper'}>
                                <div className={'pageTitle'}>
                                    전자결재
                                </div>
                                <div className={'authBtns'} style={{position: 'relative', left: '1172px'}}>
                                    {createAuth
                                        ? <button onClick={() => {
                                            alert('새 결재 등록 가능')
                                        }} title={'권한 : C'}>
                                            새 결재
                                        </button>
                                        : <button title={'권한 : C'} className={'no-auth'}>
                                            새 결재
                                        </button>
                                    }
                                </div>

                                <div>
                                    <div className={'table-title'}>
                                        결재 대기 문서
                                    </div>
                                    <table>
                                        <tr>
                                            <td>
                                                기안일
                                            </td>
                                            <td>
                                                결재양식
                                            </td>
                                            <td>
                                                기안자
                                            </td>
                                            <td>
                                                제목
                                            </td>
                                            <td>
                                                문서번호
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                2020-03-15
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                라온인1
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                raon-200315-연차
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                2020-03-16
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                라온인2
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                raon-200316-연차
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                2020-03-17
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                라온인3
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                raon-200317-연차
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                <div>
                                    <div className={'table-title'} style={{marginTop: '40px'}}>
                                        기안 진행 문서
                                    </div>
                                    <table>
                                        <tr>
                                            <td>
                                                기안일
                                            </td>
                                            <td>
                                                결재양식
                                            </td>
                                            <td>
                                                제목
                                            </td>
                                            <td>
                                                문서번호
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                2021-03-18
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                raon-210318-연차
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                <div>
                                    <div className={'table-title'} style={{marginTop: '40px'}}>
                                        완료 문서
                                    </div>
                                    <table>
                                        <tr>
                                            <td>
                                                기안일
                                            </td>
                                            <td>
                                                결재양식
                                            </td>
                                            <td>
                                                제목
                                            </td>
                                            <td>
                                                문서번호
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                2019-02-07
                                            </td>
                                            <td>
                                                개인경비 지출결의서
                                            </td>
                                            <td>
                                                계정관리기술팀_{localStorage.getItem('userName')}_2019 개인경비 지출결의서
                                            </td>
                                            <td>
                                                raon-190207_지출일반
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                2019-01-29
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                raon-190129-연차
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                2019-01-14
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                raon-190114-연차
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="frame022283-header2347">
                        <div className="frame022283-frame260i234711167060">
                            <div className="frame022283-frame-i234711167219">
                                <span className="frame022283-text10">
                                    <span className="frame022283-text11" style={{marginLeft: '-20px'}}>
                                        {localStorage.getItem('userName')}님 환영합니다. {localStorage.getItem('lastLogin')}
                                    </span>
                                </span>
                                <button className="frame022283-buttons-primary-i234711167300"
                                        style={{cursor: 'pointer'}}
                                        onClick={() => {
                                            common.logout(history)
                                        }}>
                                    <div className="frame022283-surface-i23471116730011088202">
                                        <img className="frame022283-image20"/>
                                        <span className="frame022283-text12">
                                            <span className="frame022283-text13">로그아웃</span>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="frame022283-group3256356" onClick={() => {
                        common.goMain(history)
                    }}>
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

export default Approval;