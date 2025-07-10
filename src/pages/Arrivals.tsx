import React, {useEffect, useState} from 'react';
import {showArrivalsByPostCode, BusDetails} from '../scripts/busQueries'
import {ArrivalTable} from '../components/ArrivalTable'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ModalPopUp } from '../components/ModalPopUp';
import { ClipLoader } from 'react-spinners';

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

function Arrivals(): React.ReactElement {
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
      if (lastSubmittedPostcode !== undefined)  {

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
    if (postcode !== undefined) {
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
    <h1 className="d-flex"> BusBoard </h1>
    <Form action="" onSubmit={formHandler}>
      <Form.Group className="mb-3" controlId="postcode">
        <Form.Label>Postcode</Form.Label>
        <Form.Control type="text" onChange={updatePostcode} />
      </Form.Group>
      <Button variant="primary" type="submit" value="Submit">Submit</Button>
    </Form>
    {loading ? <ClipLoader loading={loading} /> : < ArrivalTable busDetails={tableData} />}
    <ModalPopUp opened= {isOpen} hideModal={hideModal} />
  </div>
}

export default Arrivals;