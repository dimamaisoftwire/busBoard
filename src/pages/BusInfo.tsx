import React from "react";
import { Card, CardBody, CardTitle, Container } from 'react-bootstrap';
import FirstBus from '../images/FirstBus.jpg';
import Image from 'react-bootstrap/Image';

function BusInfo() : React.ReactElement {
    return (
        <div className="d-flex justify-content-center align-items-center ">
      <Card style={{width:'18rem'}} className="mt-5">
        <Container className="d-flex justify-content-center align-items-center">
            <div className="flex w-10">
                <Image src={FirstBus} roundedCircle style={{width: '100px', height: '100px'}}/>
            </div>
        </Container>
        <CardBody>
            <Card.Title>
                History of busses
            </Card.Title>
            <Card.Text>
                The first public bus system was introduced in Nantes, France, by Stanislas Baudry in 1826. These omnibuses (from the latin meaning, 'for all') were horse-drawn carriages that could carry up to 16 passengers. The public response was enthusiastic, and the idea quickly caught on.
            </Card.Text>
        </CardBody>
      </Card>
      </div>  
    );
}

export default BusInfo;