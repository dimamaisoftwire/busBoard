import React, {useEffect, useState} from 'react';
import {getStopPointNextNArrivals, getNearestNStopPointsToPostCode, BusDetails, StopPoint} from '../scripts/busQueries'
import {ArrivalTable} from '../components/ArrivalTable'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ModalPopUp } from '../components/ModalPopUp';
import { Card, CardBody, CardTitle } from 'react-bootstrap';

const SECOND = 1000;
const TABLE_REFRESH_SECONDS = 10;

async function getBuses(stopPoint: StopPoint): Promise<BusDetails[] | undefined> {
  return await getStopPointNextNArrivals(stopPoint,5);
}


function valid_postcode(postcode:string) {
  postcode = postcode.replace(/\s/g, "");
  let regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
  return regex.test(postcode);
}

function Arrivals(): React.ReactElement {
  const [postcode, setPostcode] = useState<string | undefined>(undefined);
  const [lastSubmittedPostcode, setSubmittedPostcode] = useState<string | undefined>(undefined);

  const [firstTableData, setFirstTableData] = useState<BusDetails[] | undefined>(undefined);
  const [firstTableTitle, setFirstTableTitle] = useState<string | undefined>(undefined);

  const [secondTableData, setSecondTableData] = useState<BusDetails[] | undefined>(undefined);
  const [secondTableTitle, setSecondTableTitle] = useState<string | undefined>(undefined);

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
        setLoading(true);
        updateTables(lastSubmittedPostcode)
            .then(
            () => {
              setLoading(false)
            }
        );

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
        updateTables(postcode)
            .then(
                () => {
                  setLoading(false)
                }
            );

      } else{
        showModal()
      }
    }
  }

  async function updateTables(postcode: string): Promise<void> {
    return getNearestNStopPointsToPostCode(postcode,2)
        .then(
            (stopPoints) => {
              if (stopPoints !== undefined) {
                getBuses(stopPoints[0])
                    .then((busData) => {
                      setFirstTableTitle(stopPoints[0].commonName);
                      setFirstTableData(busData);
                    });
                getBuses(stopPoints[1])
                    .then((busData) => {
                      setSecondTableTitle(stopPoints[1].commonName);
                      setSecondTableData(busData);
                    });
              }

            });
  }

  function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
    setPostcode(data.target.value)
  }

  return <div className="d-flex flex-column align-items-center bg-dark">
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
          </div>
        </Form>
      </CardBody>
    </Card>
    <h2>Arrivals at: {lastSubmittedPostcode}</h2>
    <div className={firstTableData === undefined ?"" : "flex w-75" /* only draw border if there is a table */}>
      < ArrivalTable busDetails={firstTableData} title={secondTableTitle} loading={loading}/>
    </div>
  <div className={secondTableData === undefined ?"" : "flex mt-5 w-75 mb-5" /* only draw border if there is a table */}>
      < ArrivalTable busDetails={secondTableData} title={firstTableTitle} loading={loading}/>
  </div>
    <ModalPopUp opened= {isOpen} hideModal={hideModal} />
  </div>
}

export default Arrivals;