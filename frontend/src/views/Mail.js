import React, {useCallback, useEffect, useState} from 'react'
import '../css/frame022283.css'
import '../css/mainStyle.css'
import '../css/mailStyle.css'
import {useHistory} from "react-router-dom";
import * as common from '../components/CommonFunction';
import 'react-quill/dist/quill.snow.css';
import GetData from "../ajax/GetData";

const contextPath = '/raon-demo-cs';
const serviceId = 'aaaaaac';

const Mail = () => {

    const [createAuth, setCreateAuth] = useState(false);
    const [deleteAuth, setDeleteAuth] = useState(false);
    const [printAuth, setPrintAuth] = useState(false);
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
                                if (p.indexOf("D") !== -1) {
                                    setDeleteAuth(true);
                                }
                                if (p.indexOf("P") !== -1) {
                                    setPrintAuth(true);
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

                            <div className={'mail-wrapper'}>
                                <div className={'pageTitle'}>
                                    메일
                                </div>
                                <div className={'authBtns'} style={{position: 'relative', left: '945px'}}>
                                    {createAuth
                                        ? <button style={{marginRight: '15px'}} title={'권한 : C'} onClick={() => {
                                            alert('메일 쓰기 가능')
                                        }}>
                                            메일 쓰기
                                        </button>
                                        : <button style={{marginRight: '15px'}} title={'권한 : C'} className={'no-auth'}>
                                            메일 쓰기
                                        </button>
                                    }

                                    {deleteAuth
                                        ? <button style={{marginRight: '15px'}} title={'권한 : D'} onClick={() => {
                                            alert('메일 삭제 가능')
                                        }}>
                                            메일 삭제
                                        </button>
                                        : <button style={{marginRight: '15px'}} title={'권한 : D'} className={'no-auth'}>
                                            메일 삭제
                                        </button>
                                    }

                                    {printAuth
                                        ? <button onClick={() => {
                                            alert('목록 출력 가능')
                                        }} title={'권한 : P'}>
                                            목록 출력
                                        </button>
                                        : <button title={'권한 : P'} className={'no-auth'}>
                                            목록 출력
                                        </button>
                                    }
                                </div>

                                <div>
                                    <div className={'table-title'}>
                                        받은메일함
                                    </div>
                                    <table>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}>
                                                <input type="checkbox"/>
                                            </td>
                                            <td style={{width: '10%'}}>
                                                보낸사람
                                            </td>
                                            <td>
                                                제목
                                            </td>
                                            <td style={{width: '15%'}}>
                                                받은날짜
                                            </td>
                                            <td style={{width: '7%'}}>
                                                크기
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}>
                                                <input type="checkbox"/>
                                            </td>
                                            <td>
                                                라온인109
                                            </td>
                                            <td>
                                                Fwd: Fwd: 라온서비스 통합포털 1차 구축사업 분리발주 도입 건
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>2022-04-11 12:48</div>
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>45KB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}><input type={'checkbox'}/>
                                            </td>
                                            <td>
                                                라온인42
                                            </td>
                                            <td>
                                                Fwd: [라온증권] SSO서버 업무 지원 요청
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>2022-04-11 10:16</div>
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>20KB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}><input type={'checkbox'}/>
                                            </td>
                                            <td>
                                                라온인2
                                            </td>
                                            <td>
                                                라온플라자 개발 라이센스 OS: AIX
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>2022-04-10 15:32</div>
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>14KB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}><input type={'checkbox'}/>
                                            </td>
                                            <td>
                                                라온인14
                                            </td>
                                            <td>
                                                개발서버 정보 전달
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>2022-04-09 10:01</div>
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>45KB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}><input type={'checkbox'}/>
                                            </td>
                                            <td>
                                                라온인88
                                            </td>
                                            <td>
                                                [라온연금공단] SSO/EAM 권한관리 회의록
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>2022-04-08 17:55</div>
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>66KB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}><input type={'checkbox'}/>
                                            </td>
                                            <td>
                                                라온인91
                                            </td>
                                            <td>
                                                Fwd: [라온정보원] 분리발주 SW 설치를 위한 미팅을 요청드립니다.
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>2022-04-07 09:48</div>
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>33KB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}><input type={'checkbox'}/>
                                            </td>
                                            <td>
                                                라온인5
                                            </td>
                                            <td>
                                                [라온화재보험][중복로그인제어] 에이전트 오류 분석 및 패치
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>2022-04-05 11:49</div>
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>102KB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}><input type={'checkbox'}/>
                                            </td>
                                            <td>
                                                라온인31
                                            </td>
                                            <td>
                                                SSO 로그인 관련 로그 송부드립니다.
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>2022-03-18 12:05</div>
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>59KB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}><input type={'checkbox'}/>
                                            </td>
                                            <td>
                                                라온인109
                                            </td>
                                            <td>
                                                휴가신청서
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>2022-03-15 13:19</div>
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>45KB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}><input type={'checkbox'}/>
                                            </td>
                                            <td>
                                                라온마스터
                                            </td>
                                            <td>
                                                [업무참고] KISA보안공지 - Spring Java 프레임워크 보안 업데이트 권
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>2022-03-11 10:35</div>
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>11KB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '10px', textAlign: 'center'}}><input type={'checkbox'}/>
                                            </td>
                                            <td>
                                                라온인29
                                            </td>
                                            <td>
                                                RE: SSO/FIDO 개발 환경 구축 방문에 따른 사전 준비 요청의 件
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>2022-03-05 19:48</div>
                                            </td>
                                            <td>
                                                <div style={{color: 'gray'}}>41KB</div>
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

export default Mail;