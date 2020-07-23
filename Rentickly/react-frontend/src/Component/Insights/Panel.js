import React from 'react'; 
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer } from "mdbreact"; 


const InsightsPanel = () => {
    return (
        <MDBContainer>
        <MDBCardGroup deck>
            <MDBCard  color="indigo" text="white" className="text-center">
                <MDBCardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
                </MDBCardBody>
            </MDBCard>
            <MDBCard color="indigo" text="white" className="text-center">
                <MDBCardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
                </MDBCardBody>
            </MDBCard>
            <MDBCard color="indigo" text="white" className="text-center">
                <MDBCardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
        </MDBContainer>
    );
    };
    
    export default InsightsPanel;