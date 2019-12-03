import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import App from "./App";
import { API_BASE_URL } from "./config";
import * as serviceWorker from "./serviceWorker";

// Set axios config.
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
 
  // axios.get(`elections/forDemo/new`)
  //  .then(res => {
  //      const electionId = res.data[0].ID;
  //      sessionStorage.setItem("election_id", electionId);
  //     });  

//   axios.get(`permission`)
//   .then(res => {
//       console.log("jjjjjjjjjjjjjjjjjjj",res.data);
//       });

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Set session data
// sessionStorage.setItem("election_id", ELECTION_ID);

