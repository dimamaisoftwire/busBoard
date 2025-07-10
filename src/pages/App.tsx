import React, {useEffect, useState} from 'react';
import {showArrivalsByPostCode, BusDetails} from '../busQueries'
import {ArrivalTable} from '../ArrivalTable'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ModalPopUp } from '../ModalPopUp';

const SECOND = 1000;
const TABLE_REFRESH_SECONDS = 30;

async function getBuses(postcode:  string): Promise<BusDetails[]> {
  const busDetails = await showArrivalsByPostCode(postcode);

  return Array.from(busDetails.values())[0];
}
function valid_postcode(postcode:string) {
  postcode = postcode.replace(/\s/g, "");
  var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
  return regex.test(postcode);
}

function App(): React.ReactElement {
  const [postcode, setPostcode] = useState<string | undefined>(undefined);
  const [tableData, setTableData] = useState<BusDetails[] | undefined>(undefined);
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  useEffect (() => {

    const interval = setInterval(() => {
      if (postcode != undefined)  {

        getBuses(postcode)
            .then((data) => {

              setTableData(data)
            });
      }



    }, TABLE_REFRESH_SECONDS * SECOND)

    return () => clearInterval(interval);
  }, [postcode])

  async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); // to stop the form refreshing the page when it submits
    if (postcode != undefined) {
      if(valid_postcode(postcode)){
        const data = await getBuses(postcode);
        setTableData(data);
      } else{
        showModal()
      }
    }

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
    <ModalPopUp opened= {isOpen} showModal={showModal} hideModal={hideModal} />
  </div>
}

export default App;