import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from "react-router-dom";
import store from './store';
import Login from './views/Login';
import Main from './views/Main';
import Mail from './views/Mail';
import Approval from './views/Approval';
import Groupware from './views/Groupware';

const contextPath = '/raon-demo-cs';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route path={`${contextPath}/`} component={Login} exact/>
                    <Route path={`${contextPath}/Main`} component={Main}/>
                    <Route path={`${contextPath}/Mail`} component={Mail}/>
                    <Route path={`${contextPath}/Approval`} component={Approval}/>
                    <Route path={`${contextPath}/Groupware`} component={Groupware}/>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
