import React, { useContext, useState } from "react";
import { QosOption } from "./index";
import { Button, Form } from "react-bootstrap";

const Publisher = ({ publish, connectStatus })=>{
    const qosOptions = useContext(QosOption);
  const [values, setValues] = useState({
    topic: "testtopic/react",
    payload: "",
    qos: 0,
  });

  const onPublish = (values) => {
    publish(values);
  };
    return(
        <div>
            <h2>
                This is the Publisher
            </h2>
           <Form>
           <Form.Group className="mb-3" controlId="form1">
                    <Form.Label>Topic</Form.Label>
                    <Form.Control  id="outlined-basic"
                                    autoComplete="off"
                                    value={values.topic}
                                    onChange={(e) =>setValues((prevState) => ({...prevState,topic: e.target.value,}))} />
                    <Form.Label htmlFor="disabledSelect">Qos</Form.Label>
                    <Form.Select 
                            value={values.qos}
                            onChange={(e) =>
                            setValues((prevState) => ({
                  ...prevState,
                  qos: e.target.value,
                }))
              }>
                        {qosOptions.map((qos) => (
                <option key={qos.value} value={qos.value}>
                  {qos.label}
                </option>
              ))}
                    </Form.Select>
                    <Form.Label>Payload</Form.Label>
                    <Form.Control type="text" placeholder="payload"  id="outlined-multiline-flexible"
          value={values.payload}
          onChange={(e) =>
            setValues((prevState) => ({
              ...prevState,
              payload: e.target.value,
            }))
          } />
                </Form.Group>
                <Button disabled={!(connectStatus === "Connected")}
          onClick={() => onPublish(values)}>Publish</Button>
           </Form>
        </div>
    );
}

export default Publisher;