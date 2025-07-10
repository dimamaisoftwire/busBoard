import {BusDetails} from "../scripts/busQueries";
import Table from 'react-bootstrap/Table';

function getTimeToArrival(bus: BusDetails) {
    return Math.floor(bus.timeToStation / 60);
}

const ArrivalTable = ({busDetails, title}:{busDetails:BusDetails[]|undefined, title:string | undefined}): React.ReactElement => {
    if(busDetails===undefined || title === undefined) {
        return <></>
    }

    if(busDetails.length === 0){
        return <>Sorry nothing running!</>
    }

    return (
        <Table striped>

            <h3>{title}</h3>

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