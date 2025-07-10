import {BusDetails} from "../scripts/busQueries";
import Table from 'react-bootstrap/Table';
import { Placeholder

 } from "react-bootstrap";
function getTimeToArrival(bus: BusDetails) {
    return Math.floor(bus.timeToStation / 60);
}

const ArrivalTable = ({busDetails, loading}:{busDetails:BusDetails[]|undefined, loading:boolean}): React.ReactElement => {
    if(loading===true){
        return(
        <Table striped>
            <tbody>
                <tr>
                    <td>
                        Destination
                    </td>
                    <td><Placeholder xs={12} bg="primary"/></td>
                    <td><p><Placeholder/></p></td>
                </tr>
                <tr>
                    <td>
                        Lines
                    </td>
                    <td><p><Placeholder/></p></td>
                    <td><p><Placeholder/></p></td>
                </tr>
                <tr>
                    <td> Arrives In (minutes)</td>
                    <td><p><Placeholder/></p></td>
                    <td><p><Placeholder/></p></td>
                </tr>
            </tbody>
        </Table>);
    }
    if(busDetails===undefined){
        return <></>
    }

    if(busDetails.length === 0){
        return <>Sorry nothing running!</>
    }

    return (
        <Table striped>
            <tbody>
                <tr>
                    <td>
                        Destination
                    </td>
                    {busDetails.map(busDetail => <td>{busDetail.destinationName}</td>)}
                </tr>
                <tr>
                    <td>
                        Lines
                    </td>
                    {busDetails.map(busDetail => <td>{busDetail.lineName}</td>)}
                </tr>
                <tr>
                    <td> Arrives In (minutes)</td>
                    {busDetails.map(busDetail => <td>{getTimeToArrival(busDetail)}</td>)}
                </tr>
            </tbody>
        </Table>);
}

export {ArrivalTable};