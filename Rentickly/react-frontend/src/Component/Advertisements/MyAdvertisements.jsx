import React from "react";
import { Card, CardColumns, Button } from "react-bootstrap";
import NavBar from "../LandingPage/NavBar";
import axios from "axios";
import ViewAdvertisement from "./ViewAdvertisement";
import { Link } from "react-router-dom";
import room1 from "../../../src/assets/Room1.jpg";
import room2 from "../../../src/assets/Room2.gif";
import room3 from "../../../src/assets/Room3.png";
import Footer from "../Footer/Footer";

class MyAdvertisements extends React.Component {
  state = {
    properties: [],
  };

  componentDidMount() {
    const data = { email: localStorage.getItem("email") };
    console.log(localStorage.getItem("email"));
    axios
      .post("/user/getAds", data)
      .then((res) => {
        const records = res.data;
        this.setState({
          properties: records,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    var result = [];
    if (this.state.properties) {
      const records = this.state.properties.record;
      if (records) {
        result = records.map(function (item, i) {
          return (
            <CardColumns>
              <Card key={item.aId} className="col-lg-12 mb-5 ml-auto mr-3">
                {/* <Card.Img variant="top" src={room[0]} /> */}
                <Card.Body>
                  <Card.Title>{item.aId}</Card.Title>
                  {/* <Card.Text className="pt-1">{room[1]}</Card.Text> */}
                  <Card.Text>
                    <strong>{item.adTitle}</strong>
                  </Card.Text>
                  <Button
                    onClick={() => {
                      alert("Property has been added to your wishlist.!");
                    }}
                  >
                    Add to Wishlist
                  </Button>
                  <Link
                    to={{
                      pathname: `/myAds/ad/${item.aId}`,
                      myCustomProps: item,
                    }}
                  >
                    <Button>View Advertisement</Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardColumns>
          );
        });
        // console.log(result);
      }
    }

    return (
      <div className="mt-5">
        <NavBar />
        {result.length === 0 ? "" : result}
        <Footer />
      </div>
    );
  }
}

export default MyAdvertisements;
