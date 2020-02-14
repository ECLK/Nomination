import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
//import Loadable from 'react-loadable';

import Progress from "./components/Progress/Progress";
import Login from "./pages/Login/Login";
import store from "./state/store";
import axios from "axios";

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// Add a request interceptor to set the authorization header
axios.interceptors.request.use(function (config) {
  config.headers.Authorization =  "Bearer " +getCookie('somekey');
  return config;
});

sessionStorage.setItem("party_id", getCookie('party_id'));
sessionStorage.setItem("division_id", getCookie('division_id'));



const styles = theme => ({
  root: {
    //textAlign: 'center',
    paddingTop: theme.spacing.unit * 10
  }
});

const LoadableProtectedApp = lazy(() => import("./ProtectedApp"));

class App extends React.Component {
  state = {
    open: false
  };

  constructor(props) {
    super(props);
    if (process.env.NODE_ENV === 'production'){
      if (!getCookie('somekey')) {
        window.location.href = `${process.env.REACT_APP_NOMINATION_URL}/signin`
      }
    }else{
      if (!getCookie('somekey')) {
        window.location.href = "http://localhost:3000/signin"
      }
    }

    
    this.state = {
      user: {}
    };
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;

    return (
      <Provider store={store}>
        <div className={classes.root}>
          <Suspense fallback={Progress}>
            <Router basename="/election">
              <Switch>
                {
                  <Route
                    path="/login"
                    render={props => (
                      <Login {...props} updateUser={this.updateUser} />
                    )}
                  />
                }
                <Route path="/logout" />
                {!user && <Redirect to={{ pathname: "/login" }} />}
                <Route render={() => <LoadableProtectedApp user={user} />} />
              </Switch>
            </Router>
          </Suspense>
        </div>
      </Provider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));
