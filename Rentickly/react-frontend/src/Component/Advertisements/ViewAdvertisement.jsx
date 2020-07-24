import React from "react";
import NavBar from "../LandingPage/NavBar";
import Footer from "../Footer/Footer";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class ViewAdvertisement extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     console.log(this.props.location.myCustomProps);
  //   }
  state = {
    aid: this.props.location.myCustomProps.aId,
    userId: this.props.location.myCustomProps.userId,
    adTitle: this.props.location.myCustomProps.adTitle,
    adress: this.props.location.myCustomProps.propertyAddress,
    desc: this.props.location.myCustomProps.propertyDescription,
    loc: this.props.location.myCustomProps.propertyLocation,
    type: this.props.location.myCustomProps.propertyType,
    zipcode: this.props.location.myCustomProps.zipCode,
  };

  submit = () => {};

  render() {
    const { aid, userId, adTitle } = this.state;
    return (
      <div>
        <NavBar />
        <Link
          to={{
            pathname: `/Review`,
            data: { aid: aid, userId: userId, house_name: adTitle },
          }}
        >
          <Button>View Advertisement</Button>
        </Link>
        <Footer />
      </div>
    );
  }
}

export default ViewAdvertisement;
