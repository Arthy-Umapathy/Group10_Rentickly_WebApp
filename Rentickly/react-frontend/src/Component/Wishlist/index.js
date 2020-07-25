import React, { useEffect, useState } from "react";
import { Card, CardColumns, Button, Row, Badge } from "react-bootstrap";
import NavBar from "../LandingPage/NavBar";
import "./SearchBar.css";

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
];function Findroom (){
  const[rooms, setRooms] = useState([]);
  useEffect( () => {
    fetch('http://localhost:5000/user/search').then(response =>
      response.json().then(data => {
        setRooms(data.record)
      })
    )
  }, []);
  console.log(rooms);
  return (
    <div className="mt-5">
      <NavBar />
      <div class="search">
        <input
          type="text"
          class="searchTerm"
          placeholder="What are you looking for?"
        />
        <button type="submit" class="searchButton">
          <i class="fa fa-search"></i>
        </button>
      </div>
      <Row className="container-fluid">
        { rooms.length !== 0 ? (
          rooms.map(room => {
            return (
              <Card
                key={room[0]}
                className="col-lg-3 mb-5 ml-5 mr-auto"
                style={{ border: "none" }}
              >
                {/* <Card.Img
                  variant="top"
                  src={room.image}
                  style={{ borderRadius: "10%" }}
                /> */}
                <Card.Body>
                <Card.Title>{room[1]}</Card.Title>
                <Card.Text className="pt-1">{room[3]}</Card.Text>
                <Card.Text className="pt-1">{room[2]}</Card.Text>
                <Card.Text>
                  <strong>${room[4]}</strong>/Month
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
            )
          })
        ) : (
          <center className="container m-5">
            <h2>No Result found!</h2>
          </center>
        )

        }

      </Row>
      {/* <CardColumns className="container-fluid">
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
      </CardColumns> */}
      <Footer />
    </div>
  );
}


export default Findroom;