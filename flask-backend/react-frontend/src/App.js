import React, { Component } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import AboutUs from "./Component/AboutUs/AboutUs";
import FAQs from "./Component/FAQs/FAQContainer";
import Help from "./Component/Contact/Help";
import LandingPage from "./Component/LandingPage/LandingPage";
import PageNotFound from "./Component/LandingPage/PageNotFound";
import SignUp from "./Component/Login/SignUp";
import SignIn from "./Component/Login/SignIn";
import Resetpassword from "./Component/LandingPage/Resetpassword";
import Profile from "./Component/Login/Profile";
import UpdateProfile from "./Component/Login/UpdateProfile";
import Review from "./Component/Review/review";
import PostAdvertisement from "./Component/PostAdvertisment/PostAdvertisment";
//import Home from "./Component/SearchBar/Home";
import RentalApplication from "./Component/RentalApplication/RentalApplication";
import BookAppointment from "./Component/BookAppointment/BookAppointment";
import WishlistPage from "./Component/Wishlist/index";
import ViewPost from "./Component/ViewPost/ViewPostPage";

class App extends Component {
  render() {
    return (
      <Router className="container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/Resetpassword" component={Resetpassword} />
          <Route exact path="/AboutUs" component={AboutUs} />
          <Route exact path="/Help" component={Help} />
          <Route exact path="/FAQs" component={FAQs} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/Profile" component={Profile} />
          <Route exact path="/Update" component={UpdateProfile} />
          <Route exact path="/BookAppointment" component={BookAppointment} />
          <Route exact path="/Review" component={Review} />
          <Route exact path="/ViewPost" component={ViewPost} />
          <Route exact path="/wishlist" component={WishlistPage} />
          {/* <Route exact path="/Search" component={Home} /> */}
          <Route
            exact
            path="/PostAdvertisement"
            component={PostAdvertisement}
          />
          <Route
            exact
            path="/RentalApplication"
            component={RentalApplication}
          />
          <Route exact path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;
