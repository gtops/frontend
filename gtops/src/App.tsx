import * as React from 'react';
import {Route, Switch} from "react-router";
import {BrowserRouter} from 'react-router-dom';
import {Home} from "./screens/home";
import {NotFound} from "./screens/not-found";
import {Header} from "./components/header";
import "./App.scss";
import {Footer} from "./components/footer";
import {UserResult} from "./screens/user-result";

class App extends React.Component {
    render(): React.ReactNode {
        return (
            <>
                <Header/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/user-result" component={UserResult}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </>
        );
    }
}

export default App;
