import React, {useEffect, useState} from 'react'
import '../css/frame022283.css'
import '../css/mainStyle.css'
import {useHistory} from "react-router-dom";
import GetData from "../ajax/GetData";
import * as common from '../components/CommonFunction';

const contextPath = '/raon-demo-cs';

const Main = () => {
    const [uacls, setUacls] = useState(undefined);
    let history = useHistory();

    const services = {
        aaaaaab: ['그룹웨어',
            <>
                <div className="frame022283-u-idashboard012304" style={{cursor: 'pointer'}}
                     onClick={() => {
                         const appPath = "C:/Program Files (x86)/Internet Explorer/iexplore.exe";
                         const appArgument = `http://${window.location.host}/raon-demo-cs/Groupware`;
                         const appCurrentDir = "";
                         common.runApp(appPath, appArgument, appCurrentDir);
                         // pageMove('/Groupware')
                     }}>
                    <img
                        alt="box022305"
                        src={`${process.env.PUBLIC_URL}/img/box022305-be24-300h.png`}
                        className="frame022283-image03"
                    />
                    <span className="frame022283-text">
                    <span className="frame022283-text01">그룹웨어</span>
                </span>
                    <div className="frame022283-main2open2307">
                        <img
                            alt="Ellipse5I23071767353"
                            src={`${process.env.PUBLIC_URL}/img/ellipse5i23071767353-7pmf.svg`}
                            className="frame022283-svg"
                        />
                    </div>
                    <div className="frame022283-usersusers2308">
                        <img
                            alt="VectorI230884484"
                            src={`${process.env.PUBLIC_URL}/img/vectori230884484-p5w5.svg`}
                            className="frame022283-svg01"
                        />
                    </div>
                </div>
            </>],
        aaaaaac: ['메일',
            <>
                <div className="frame022283-u-idashboard012310" style={{cursor: 'pointer'}}
                     onClick={() => pageMove(`/Mail`)}>
                    <img
                        alt="box022311"
                        src={`${process.env.PUBLIC_URL}/img/box022311-io8g-300h.png`}
                        className="frame022283-image05"
                    />
                    <span className="frame022283-text02">
                    <span className="frame022283-text03">메일</span>
                </span>
                    <div className="frame022283-main2open2313">
                        <img
                            alt="Ellipse5I23131767353"
                            src={`${process.env.PUBLIC_URL}/img/ellipse5i23131767353-unlu.svg`}
                            className="frame022283-svg02"
                        />
                    </div>
                    <div className="frame022283-envelopeenvelopeopen2314">
                        <img
                            alt="GroupI2314134106"
                            src={`${process.env.PUBLIC_URL}/img/groupi2314134106-tt08.svg`}
                            className="frame022283-image06"
                        />
                    </div>
                </div>
            </>],
        aaaaaad: ['전자결재',
            <>
                <div className="frame022283-u-idashboard012316" style={{cursor: 'pointer'}}
                     onClick={() => pageMove(`/Approval`)}>
                    <img
                        alt="box022317"
                        src={`${process.env.PUBLIC_URL}/img/box022317-poco-300h.png`}
                        className="frame022283-image07"
                    />
                    <span className="frame022283-text04">
                    <span className="frame022283-text05">전자결재</span>
                </span>
                    <div className="frame022283-main2open2319">
                        <img
                            alt="Ellipse5I23191767353"
                            src={`${process.env.PUBLIC_URL}/img/ellipse5i23191767353-v2db.svg`}
                            className="frame022283-svg04"
                        />
                    </div>
                    <div className="frame022283-card2320">
                        <img
                            alt="GroupI2320134236"
                            src={`${process.env.PUBLIC_URL}/img/groupi2320134236-2f4.svg`}
                            className="frame022283-image08"
                        />
                    </div>
                </div>
            </>],
        none: <>
            <div className="frame022283-u-idashboard012344">
                <img
                    alt="box022345"
                    src={`${process.env.PUBLIC_URL}/img/box022345-9f7s-300h.png`}
                    className="frame022283-image19"
                />
                <img
                    alt="8352"
                    src={`${process.env.PUBLIC_URL}/img/8352-yfn.svg`}
                    className="frame022283-svg10"
                />
            </div>
        </>,
    }

    const pageMove = (url) => {
        history.push(`${contextPath}${url}`);
    }

    useEffect(() => {
        const localToken = localStorage.getItem("ssoToken");

        if (localToken !== null && localToken !== '') {
            GetData("/REST/tokenCheck", {ssoToken: localToken})
                .then((rs) => {

                    if (rs.nResult >= 0) {
                        const uacl = JSON.parse(rs.uacl);

                        setUacls(
                            <>
                                <div className="frame022283-frame2262302">
                                    <div className="frame022283-frame2292343">
                                        <CardLists uacl={uacl} idx={0}/>
                                    </div>
                                    <div className="frame022283-frame2272327">
                                        <CardLists uacl={uacl} idx={1}/>
                                    </div>
                                </div>
                            </>
                        );
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

    const CardLists = (props) => {

        const sIdx = props.idx * 4;
        const eIdx = sIdx + 4;

        const rendering = () => {
            const result = [];

            for (let i = sIdx; i < eIdx; i++) {
                try {
                    result.push(<>{services[props.uacl[i].SERVICE_ID][1]}</>);
                } catch {
                    result.push(<>{services.none}</>);
                }
            }
            return result;
        };

        return <>{rendering()}</>;
    }

    const logout = () => {
        localStorage.setItem('userId', '');
        localStorage.setItem('userName', '');
        localStorage.setItem('ssoToken', '');
        history.push(`${contextPath}/`);
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
                        </div>

                        <div className="frame022283-group2372301">
                            {uacls}
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
                                        onClick={logout}>
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

export default Main;