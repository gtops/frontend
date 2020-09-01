import * as React from 'react';
import {Route, Router, Switch} from "react-router";
import {BrowserRouter} from 'react-router-dom';
import {Home} from "./screens/home";
import {NotFound} from "./screens/not-found";
import {Header} from "./components/header";
import "./App.scss";
import {UserResult} from "./screens/user-result";
import {Login} from "./screens/login/Login";
import {Profile} from "./screens/profile";
import {Calculator} from "./screens/calculator";
import {EPath} from "./EPath";
import {EventProfile} from "./screens/event-profile";
import {OrganisationProfile} from "./screens/organisation-profile";
import {ConfirmRegistration} from "./screens/confirm-registration";
import {Registration} from "./screens/registration";
import {AllEvents} from "./screens/all-events";
import {TeamProfile} from "./screens/team-profile";
import {TrialResult} from "./screens/event-result/TrialResult";
import {AllResults} from "./screens/all-results/AllResults";

class App extends React.Component {

    render(): React.ReactNode {
        return (
            <>
                <Header/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={EPath.HOME} component={Home}/>
                        <Route exact path={EPath.LOGIN} component={Login}/>
                        <Route exact path={EPath.PROFILE} component={Profile}/>
                        <Route exact path={EPath.CONFIRM_REGISTRATION} component={ConfirmRegistration}/>
                        <Route exact path={EPath.REGISTRATION} component={Registration}/>
                        <Route exact path={EPath.CALCULATOR} component={Calculator}/>
                        <Route exact path={EPath.TEAM_PROFILE} component={TeamProfile}/>
                        <Route exact path={EPath.ORGANISATION_PROFILE} component={OrganisationProfile}/>
                        <Route exact path={EPath.EVENTS} component={AllEvents}/>
                        <Route exact path={EPath.TRIAL_RESULT} component={TrialResult}/>
                        <Route exact path={EPath.USER_RESULT} component={UserResult}/>
                        <Route exact path={EPath.EVENT_PROFILE} component={EventProfile}/>
                        <Route exact path={EPath.ALL_RESULTS} component={AllResults}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
