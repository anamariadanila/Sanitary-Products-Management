import React, {Component} from "react";
import LandingPage from "./LandingPage/LandingPage";
import IstoricPage from "./IstoricPage/IstoricPage"
import InventarPage from "./InventarPage/InventarPage"
import NavBar from "./NavBar";
import {Route, Link} from "react-router-dom";

import axios from "axios";

class App extends Component {

    render() {
        return (
            <div className="App">
                <NavBar/>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/istoric" component={IstoricPage}/>
                <Route exact path="/inventar" component={InventarPage}/>
            </div>
        );
    }
}

export default App;