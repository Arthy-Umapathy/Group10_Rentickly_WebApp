import React, { useEffect, useState } from "react";
import { Card, CardColumns, Button, Row, Badge } from "react-bootstrap";
import NavBar from "../LandingPage/NavBar";
import "./SearchBar.css";
import Footer from "../Footer/Footer";

function Findroom (){
  const[rooms, setRooms] = useState([]);
  const[fRooms, setfRooms] = useState([]);
  const[searchTerm,setSearchTerm] = useState("");

  useEffect( () => {
    fetch('http://localhost:5000/user/search').then(response =>
      response.json().then(data => {
        setRooms(data.record)
      })
    )
  }, []);
  console.log("fetch all done");
  
  let fSearch;
  //setting the value of search keyword()
  const handleChange = event => {
     fSearch = (event.target.value);
     console.log("assigned value to fSearch" + fSearch);
   };

   //set the value after search button clicked

  function filterRoom()
    {
      console.log("before loop"+ fRooms)
      console.log(searchTerm + " searchTerm in function");
      console.log("fSearch in function" + fSearch);
      console.log("final term set");
      console.log("befor loop");
      //for filtered rooms
      for (let i=0;i<rooms.length;i++){
        if((rooms[i][1]).includes(fSearch))
        {
          fRooms.push(rooms[i])
        }
      }
      console.log(fRooms);
      console.log(rooms);
      console.log("for loop for filter done");

    }
  return (
    <div className="mt-5">
      <NavBar />
      <div class="search">
        <input
          type="text"
          placeholder="What are you looking for?"
          onChange={handleChange}
        />
        <button type="submit" class="searchButton" >
          <i class="fa fa-search" onClick={filterRoom}></i>
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
      <Footer />
    </div>
  );
}


export default Findroom;