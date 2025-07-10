import React, {useEffect, useState} from 'react';
import {showArrivalsByPostCode, BusDetails} from '../scripts/busQueries'
import {ArrivalTable} from '../components/ArrivalTable'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ModalPopUp } from '../components/ModalPopUp';
import { ClipLoader } from 'react-spinners';
import { Card, CardBody, CardTitle } from 'react-bootstrap';

const SECOND = 1000;
const TABLE_REFRESH_SECONDS = 10;

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
  const [lastSubmittedPostcode, setSubmittedPostcode] = useState<string | undefined>(undefined);
  const [tableData, setTableData] = useState<BusDetails[] | undefined>(undefined);
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  useEffect (() => {
    const interval = setInterval(() => {
      if (lastSubmittedPostcode != undefined)  {

        getBuses(lastSubmittedPostcode)
            .then((data) => {

              setTableData(data)
            });
      }
    }, TABLE_REFRESH_SECONDS * SECOND)

    return () => clearInterval(interval);
  }, [lastSubmittedPostcode])

  async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); // to stop the form refreshing the page when it submits
    if (postcode != undefined) {
      if(valid_postcode(postcode)){
        setLoading(true);
        setSubmittedPostcode(postcode);
        const data = await getBuses(postcode);
        setTableData(data);
        setLoading(false);
      } else{
        showModal()
      }
    }

  }

  function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
    setPostcode(data.target.value)
  }

  return <div className="d-flex flex-column align-items-center">
    <Card className="mt-5 text-center" style={{ width: "18rem"}}>
      <CardBody>
        <CardTitle> Request bus arrival information </CardTitle>
        <Form action="" onSubmit={formHandler}>
          <Form.Group className="mb-3" controlId="postcode">
            <Form.Label>Postcode</Form.Label>
            <Form.Control type="text" onChange={updatePostcode} />
          </Form.Group>
          <div className="flex flex-col">
            <Button variant="primary" type="submit" value="Submit">Look up</Button>
            {loading ? (<div className="mx-5"><ClipLoader loading={loading} /></div>): <></>}
          </div>
        </Form>
      </CardBody>
    </Card>
    <h2>Arrivals at: {lastSubmittedPostcode}</h2>
    { loading ? <></> :
    <div className={tableData == undefined ?"" : "d-flex mt-5 w-75 border border-primary rounded" /* only draw border if there is a table */}>
      < ArrivalTable busDetails={tableData}/>
    </div>
    }
    <ModalPopUp opened= {isOpen} showModal={showModal} hideModal={hideModal} />
  </div>
}

export default App;