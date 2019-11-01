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

class App extends React.Component {
    render(): React.ReactNode {
        return (
            <>
                {<Header/>}
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/user-result" component={UserResult}/>
                        <Route path="/calculator" component={Calculator}/>
                        <Route path="/user/invite" component={Registration}/>
                        <Route path="/test" component={Test}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
                {/*<Footer/>*/}
            </>
        );
    }
}

export default App;
