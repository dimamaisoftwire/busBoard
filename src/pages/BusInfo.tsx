import React from "react";
import { Card, CardBody, CardTitle, Container } from 'react-bootstrap';
import FirstBus from '../images/FirstBus.jpg';
import Image from 'react-bootstrap/Image';

function BusInfo() : React.ReactElement {
    return (
        <div className="h-100">
        <div className="m-5 d-flex flex-col bg-dark">
            <div className="w-50 text-white">
            <h2>Information about busses</h2>
            <p>A bus (contracted from omnibus,[1] with variants multibus, motorbus, autobus, etc.) is a motor vehicle that carries significantly more passengers than an average car or van, but fewer than the average rail transport. It is most commonly used in public transport, but is also in use for charter purposes, or through private ownership. Although the average bus carries between 30 and 100 passengers, some buses have a capacity of up to 300 passengers.[2] The most common type is the single-deck rigid bus, with double-decker and articulated buses carrying larger loads, and midibuses and minibuses carrying smaller loads. Coaches are used for longer-distance services. Many types of buses, such as city transit buses and inter-city coaches, charge a fare. Other types, such as elementary or secondary school buses or shuttle buses within a post-secondary education campus, are free. In many jurisdictions, bus drivers require a special large vehicle licence above and beyond a regular driving license.

Buses may be used for scheduled bus transport, scheduled coach transport, school transport, private hire, or tourism; promotional buses may be used for political campaigns and others are privately operated for a wide range of purposes, including rock and pop band tour vehicles.

Horse-drawn buses were used from the 1820s, followed by steam buses in the 1830s, and electric trolleybuses in 1882. The first internal combustion engine buses, or motor buses, were used in 1895.[3] Recently, interest has been growing in hybrid electric buses, fuel cell buses, and electric buses, as well as buses powered by compressed natural gas or biodiesel. As of the 2010s, bus manufacturing is increasingly globalised, with the same designs appearing around the world.</p>
            </div>
        <div className="mx-auto">
        <div className="d-flex justify-content-center align-items-center">
      <Card style={{width:'18rem'}} className="mt-5">
        <Container className="d-flex justify-content-center align-items-center">
            <div className="flex w-10">
                <Image src={FirstBus} roundedCircle style={{width: '100px', height: '100px', border:'2px solid #4c9eaf'}}/>
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
      </div>
      </div> 
      <div className="vh-100"></div>
      </div>
    );
}

export default BusInfo;