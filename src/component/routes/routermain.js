import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Register from "Screens/Register";
import Login from "Screens/Login";
import ForgotPass from "Screens/ChangePassword";
import ChangePass from "Screens/ChangePassword/changepassword";
import NotFound from "Screens/Components/NotFound";
import RegSuccuss from "Screens/Components/RegSuccess/index";
import Form from "Screens/Patient/SickLeaveForm/index";
import RequestList from "Screens/Patient/RequestList/index";

class Routermain extends Component {
  render() {
    return (
      <Router basename={"/sys-n-sick"}>
        <Grid>
          <Switch>
            <Route exact path="/" render={(props) => <Login {...props} />} />
            <Route
              exact
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/forgot-password"
              render={(props) => <ForgotPass {...props} />}
            />
            <Route
              exact
              path="/change-password"
              render={(props) => <ChangePass {...props} />}
            />

            <Route
              exact
              path="/register-successfull"
              render={(props) => <RegSuccuss {...props} />}
            />
            <Route
              exact
              path="/patient/sick-request"
              render={(props) => <Form {...props} />}
            />
            <Route
              exact
              path="/patient/request-list"
              render={(props) => <RequestList {...props} />}
            />
            <Route
              path="*"
              exact={true}
              render={(props) => <NotFound {...props} />}
            />
          </Switch>
        </Grid>
      </Router>
    );
  }
}
export default Routermain;
