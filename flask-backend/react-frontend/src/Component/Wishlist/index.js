import React, { Component } from "react";
import { Card, CardColumns, Button } from "react-bootstrap";
import NavBar from "../LandingPage/NavBar";

import room1 from "../../assets/Room1.jpg";
import room2 from "../../assets/Room2.gif";
import room3 from "../../assets/Room3.png";
import Footer from "../Footer/Footer";

const Property = [
  {
    city: "Toronto",
    price: "1500",
    description:
      "Te duo diceret temporibus, suas civibus pri ad. Cu adhuc ipsum oratio vel, et fugit perpetua vel. Graeci omnium te eam, pro molestie temporibus ne. Assum saepe id cum. Vel inani utroque indoctum ea, rationibus consectetuer id vix. Cu qui idque labore, meis primis quo at, meis facilisis te mea.",
    image: room1,
  },
  {
    city: "Ottawa",
    price: "500",
    description:
      "Te duo diceret temporibus, suas civibus pri ad. Cu adhuc ipsum oratio vel, et fugit perpetua vel. Graeci omnium te eam, pro molestie temporibus ne. Assum saepe id cum. Vel inani utroque indoctum ea, rationibus consectetuer id vix. Cu qui idque labore, meis primis quo at, meis facilisis te mea.",
    image: room2,
  },
  {
    city: "Hamilton",
    price: "700",
    description:
      "Te duo diceret temporibus, suas civibus pri ad. Cu adhuc ipsum oratio vel, et fugit perpetua vel. Graeci omnium te eam, pro molestie temporibus ne. Assum saepe id cum. Vel inani utroque indoctum ea, rationibus consectetuer id vix. Cu qui idque labore, meis primis quo at, meis facilisis te mea.",
    image: room1,
  },
  {
    city: "London",
    price: "900",
    description:
      "Te duo diceret temporibus, suas civibus pri ad. Cu adhuc ipsum oratio vel, et fugit perpetua vel. Graeci omnium te eam, pro molestie temporibus ne. Assum saepe id cum. Vel inani utroque indoctum ea, rationibus consectetuer id vix. Cu qui idque labore, meis primis quo at, meis facilisis te mea.",
    image: room2,
  },
  {
    city: "Windsor",
    price: "1200",
    description:
      "Te duo diceret temporibus, suas civibus pri ad. Cu adhuc ipsum oratio vel, et fugit perpetua vel. Graeci omnium te eam, pro molestie temporibus ne. Assum saepe id cum. Vel inani utroque indoctum ea, rationibus consectetuer id vix. Cu qui idque labore, meis primis quo at, meis facilisis te mea.",
    image: room1,
  },
  {
    city: "Brampton",
    price: "900",
    description:
      "Te duo diceret temporibus, suas civibus pri ad. Cu adhuc ipsum oratio vel, et fugit perpetua vel. Graeci omnium te eam, pro molestie temporibus ne. Assum saepe id cum. Vel inani utroque indoctum ea, rationibus consectetuer id vix. Cu qui idque labore, meis primis quo at, meis facilisis te mea.",
    image: room3,
  },
  {
    city: "Kitchener",
    price: "1700",
    description:
      "Te duo diceret temporibus, suas civibus pri ad. Cu adhuc ipsum oratio vel, et fugit perpetua vel. Graeci omnium te eam, pro molestie temporibus ne. Assum saepe id cum. Vel inani utroque indoctum ea, rationibus consectetuer id vix. Cu qui idque labore, meis primis quo at, meis facilisis te mea.",
    image: room3,
  },
  {
    city: "Mississauga",
    price: "1600",
    description:
      "Te duo diceret temporibus, suas civibus pri ad. Cu adhuc ipsum oratio vel, et fugit perpetua vel. Graeci omnium te eam, pro molestie temporibus ne. Assum saepe id cum. Vel inani utroque indoctum ea, rationibus consectetuer id vix. Cu qui idque labore, meis primis quo at, meis facilisis te mea.",
    image: room3,
  },
  {
    city: "Barrie",
    price: "1000",
    description:
      "Te duo diceret temporibus, suas civibus pri ad. Cu adhuc ipsum oratio vel, et fugit perpetua vel. Graeci omnium te eam, pro molestie temporibus ne. Assum saepe id cum. Vel inani utroque indoctum ea, rationibus consectetuer id vix. Cu qui idque labore, meis primis quo at, meis facilisis te mea.",
    image: room2,
  },
];
class Findroom extends Component {
  render() {
    return (
      <div className="mt-5">
        <NavBar />

        <CardColumns className="container-fluid">
          {Property.map((room, index) => {
            return (
              <Card key={index} className="col-lg-12 mb-5 ml-auto mr-3">
                <Card.Img variant="top" src={room.image} />
                <Card.Body>
                  <Card.Title>{room.city}</Card.Title>
                  <Card.Text className="pt-1">{room.description}</Card.Text>
                  <Card.Text>
                    <strong>${room.price}</strong>/Month
                  </Card.Text>
                  <Button
                    onClick={() => {
                      alert("Property has been added to your wishlist.!");
                    }}
                  >
                    Add to Wishlist
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
        <Footer />
      </div>
    );
  }
}

export default Findroom;