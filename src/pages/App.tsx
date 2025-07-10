import React, {useState} from 'react';
import {showArrivalsByPostCode, BusDetails} from '../busQueries'
import {ArrivalTable} from '../ArrivalTable'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


async function getBuses(postcode: string): Promise<BusDetails[]> {
  // very basic testing string, you'll likely return a list of strings or JSON objects instead!
  const busDetails = await showArrivalsByPostCode(postcode);

  return Array.from(busDetails.values())[0];
}

function App(): React.ReactElement {
  const [postcode, setPostcode] = useState<string>("");
  const [tableData, setTableData] = useState<BusDetails[] | undefined>(undefined);

  async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); // to stop the form refreshing the page when it submits
    const data = await getBuses(postcode);
    setTableData(data);
  }

  function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
    setPostcode(data.target.value)
  }

  return <div className="d-flex flex-column align-items-center">
  {/*<h1> BusBoard </h1>
    <form action="" onSubmit={formHandler}>
      <label htmlFor="postcodeInput"> Postcode: </label>
      <input type="text" id="postcodeInput" onChange={updatePostcode}/>
      <input type="submit" value="Submit"/>
    </form>
    < ArrivalTable busDetails={tableData}/>
  </>;*/}
    <h1 className="d-flex"> BusBoard </h1>
    <Form action="" onSubmit={formHandler}>
      <Form.Group className="mb-3" controlId="postcode">
        <Form.Label>Postcode</Form.Label>
        <Form.Control type="text" onChange={updatePostcode} />
      </Form.Group>
      <Button variant="primary" type="submit" value="Submit">Submit</Button>
    </Form>
    < ArrivalTable busDetails={tableData} />
  </div>
}

export default App;