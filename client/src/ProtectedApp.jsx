import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import SelectElection from "./pages/SelectElection/SelectElection";
import NotifierRedux from './components/NotifierRedux';

// import NominationForm from 'pages/USER/NominationForm/NominationForm';
import NominationForm from "./modules/nomination/NominationForm";

import Home from "./pages/USER/Home/Home";
import CreateNomination from "./modules/nomination/CreateNomination";
import NominationPayment from "./modules/nomination/NominationPayment";


import Objection from "./pages/USER/Objection/Objection";
import Profile from "./modules/profile/Profile";

import Admin_home from "./pages/ADMIN/Home/Home";
import CreateElectionCard from "./pages/ADMIN/createElection";
import CallElectionCard from "./pages/ADMIN/callElection";

import Admin_CallElection from "./pages/ADMIN/Call-election/Call-election";
import Admin_CandidateConfig from "./pages/ADMIN/Candidate-config/Candidate-config";

import Admin_NominationProcessConfig from "./pages/ADMIN/NominationProcess-config/NominationProcess-config";
import ActiveElectionForm from "./modules/election/ActiveElectionPage";

// import NominationReview from 'pages/ADMIN/Nomination_review/Nomination_review';
import NominationReview from "./modules/nomination/Nomination_review";
import PaymentReview from "./modules/payment/Payment_review";
import TemplateReview from "./modules/election-model/Template_review";
import ObjectionReview from "./modules/objections/Objection_review";
import ElectionReview from "./pages/ADMIN/Election_review/Election_review";

import CreateElection from "./modules/election-model/CreateElection";
import ElectionProcessReview from './modules/election/Election_process_review';
import ElectionProcessReviewDetails from './modules/election/Election_process_review_details';
import TemplateReviewData from './modules/election-model/Template_review_detail';


export default class Protected extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   isLoggedIn: false
    // };

    // dummy login process just to determine the logged in user role as 'user' or 'admin'
    // if (sessionStorage.getItem("role") !== null) {
    //   if (sessionStorage.getItem("role").includes("user")) {
    //     this.state.isLoggedIn = true;
    //   } else if (sessionStorage.getItem("role").includes("admin")) {
    //     this.state.isLoggedIn = true;
    //   } else if (sessionStorage.getItem("ig_role").includes("ig_role")) {
    //     this.state.isLoggedIn = true;
    //   } else if (sessionStorage.getItem("party_user").includes("party_user")) {
    //     this.state.isLoggedIn = true;
    //   } else if (sessionStorage.getItem("role").includes("cg_user")) {
    //     this.state.isLoggedIn = true;
    //   } else if (sessionStorage.getItem("role").includes("ac_user")) {
    //     this.state.isLoggedIn = true;
    //   }
    // }
  }

  render() {
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)scope\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var scopes = decodeURIComponent(cookieValue).split(/ +/g)
    var indexNomination = scopes.findIndex(x => x === 'nomination_edit');
console.log("indexUserhome",indexNomination);
    return (
      /* app level routers needs to handle here*/
      <div>
        <NotifierRedux />
        <Switch>
          {/*<Redirect exact from="/" to="/login" />*/}
           {
            indexNomination!==-1 ? <Redirect exact from="/admin" to="/select-election" /> : <Redirect exact from="/admin" to="/admin/home" />
          }
          <Route
            path="/home"
            component={Home}
          />
          
          <Route path="/select-election" component={SelectElection} />
          <Route path="/login" component={Login} />
          {/* <Route path='/nomination' component={Nomination} /> */}
          <Route
            path="/objection"
            component={Objection}
          />
          <Route
            path="/profile"
            component={Profile}
          />
          <Route
            path="/create-nomination"
            component={CreateNomination}
          />

          <Route
            path="/nomination"
            component={NominationForm}
          />
         
          
          <Route
            path="/admin/home"
            component={Admin_home}
          />
          <Route
            path="/admin/create-election-home"
            component={CreateElectionCard}
          />
          <Route
            path="/admin/call-election"
            component={CallElectionCard}
          />
          {/* <Route
            path="/admin/call-election"
            component={this.state.isLoggedIn ? Admin_CallElection : Login}
          /> */}
          <Route
            path="/admin/candidate-config"
            component={Admin_CandidateConfig}
          />

          <Route
            path="/admin/create-election"
            component={CreateElection}
          />

          <Route
            path="/admin/nominationProcess-config"
            component={Admin_NominationProcessConfig}
          />
          <Route
            path="/admin/active-election"
            component={ActiveElectionForm}
          />
          <Route
            path="/admin/template-review-detail"
            component={TemplateReviewData}
          />
          <Route
            path="/admin/nomination-review"
            component={NominationReview}
          />
          <Route
            path="/admin/payment-review"
            component={PaymentReview}
          />
          <Route
            path="/admin/template-review"
            component={TemplateReview}
          />
          <Route
            path="/admin/objection-review"
            component={ObjectionReview}
          />
          <Route
            path="/admin/election-review"
            component={ElectionReview}
          />
          <Route path='/election-process-review'
            exact component={ElectionProcessReview}
          />
          <Route
            path='/admin/election-process-review-detail/:electionId/:moduleId/:check' component={ElectionProcessReviewDetails}
          />
          <Route
            path='/admin/nomination-payment-list' component={NominationPayment}
          />

          {/* <Route path='/nomination' component={(this.state.isLoggedIn) ? NominationForm : Login}/>
                    <Route path='/objection' component={(this.state.isLoggedIn) ? Objection : Login} />
                    <Route path='/profile' component={(this.state.isLoggedIn) ? Profile : Login} />
                    <Route path='/election' component={(this.state.isLoggedIn) ? ElectionHome : Login}} /> */}
        </Switch>
      </div>
    );
  }
}
