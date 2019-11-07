import * as React from 'react';
import {Route, Switch} from "react-router";
import {BrowserRouter} from 'react-router-dom';
import {Home} from "./screens/home";
import {NotFound} from "./screens/not-found";
import {Header} from "./components/header";
import "./App.scss";
import {Footer} from "./components/footer";
import {UserResult} from "./screens/user-result";
import {Login} from "./screens/login/Login";
import {Profile} from "./screens/profile";
import {Calculator} from "./screens/calculator";
import {Registration} from "./screens/registration";
import {Test} from "./screens/test/Test";
import {EPath} from "./EPath";

class App extends React.Component {
    render(): React.ReactNode {
        return (
            <>
                {<Header/>}
                <BrowserRouter>
                    <Switch>
                        <Route exact path={EPath.HOME} component={Home}/>
                        <Route exact path={EPath.LOGIN} component={Login}/>
                        <Route exact path={EPath.PROFILE} component={Profile}/>
                        <Route path={EPath.USER_RESULT} component={UserResult}/>
                        <Route path={EPath.CALCULATOR} component={Calculator}/>
                        <Route path={EPath.INVITE_USER} component={Registration}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
                {/*<Footer/>*/}
            </>
        );
    }
}

export default App;
