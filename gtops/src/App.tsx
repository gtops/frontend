import * as React from 'react';
import {Route, Switch} from "react-router";
import {BrowserRouter} from 'react-router-dom';
import {Home} from "./screens/home";
import {NotFound} from "./screens/not-found";

class App extends React.Component {
    render(): React.ReactNode {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
