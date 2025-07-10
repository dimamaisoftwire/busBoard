import {BusDetails} from "../scripts/busQueries";
import Table from 'react-bootstrap/Table';
import {
    Placeholder
 } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

function getTimeToArrival(bus: BusDetails) {
    return Math.floor(bus.timeToStation / 60);
}

const TablePlaceHolder = ({width} :{width:number}): React.ReactElement => {
    return <td>
        <Placeholder as="p" animation="glow">
            <Placeholder xs={12} style={{width : width + 'em'}} />
        </Placeholder>
    </td>
}

const ArrivalTable = ({busDetails, loading}:{busDetails:BusDetails[]|undefined, loading:boolean}): React.ReactElement => {
    if (busDetails === undefined) {
        return <></>
    }

    if (busDetails.length === 0) {
        return <>Sorry nothing running!</>
    }
    return (
        <div style={{borderRadius: 6, overflow:'hidden'}}>
            <Table className="rounded mb-0" striped>
                <tbody>
                <tr>
                    <td>
                        Destination
                    </td>
                    {
                        loading ?
                            <>
                                <TablePlaceHolder width={8}/>
                                <TablePlaceHolder width={8}/>
                                <TablePlaceHolder width={8}/>
                                <TablePlaceHolder width={8}/>
                                <TablePlaceHolder width={8}/>
                            </>
                            :busDetails.map(busDetail => <td><p>{busDetail.destinationName}</p></td>)
                    }
                </tr>
                <tr>
                    <td>
                        Lines
                    </td>
                    {
                        loading ?
                        <>
                            <TablePlaceHolder width={8}/>
                            <TablePlaceHolder width={8}/>
                            <TablePlaceHolder width={8}/>
                            <TablePlaceHolder width={8}/>
                            <TablePlaceHolder width={8}/>
                        </>
                        : busDetails.map(busDetail => <td><p>{busDetail.lineName}</p></td>)
                    }
                </tr>
                <tr>
                    <td> Arrives In (minutes)</td>
                    {
                        loading ?
                            <>
                                <TablePlaceHolder width={8}/>
                                <TablePlaceHolder width={8}/>
                                <TablePlaceHolder width={8}/>
                                <TablePlaceHolder width={8}/>
                                <TablePlaceHolder width={8}/>
                            </>
                            : busDetails.map(busDetail => <td><p>{getTimeToArrival(busDetail)}</p></td>)
                    }
                </tr>
                </tbody>
            </Table>
        </div>
    )
}

export {ArrivalTable};