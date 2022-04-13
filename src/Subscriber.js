import React, { useContext, useState } from "react";
import { QosOption } from "./index";
import { Form, Button } from "react-bootstrap";

const Subscriber = ({ sub, unSub, getsubscribedTopic, connectStatus }) => {
    const qosOptions = useContext(QosOption);
  const [values, setValues] = useState({
    topic: "testtopic/react",
    qos: 0,
  });
  const [subscribedTopic, setSubscribedTopic] = useState([]);

  const onSubscribe = (values) => {
    sub(values);
    setSubscribedTopic([...subscribedTopic, values.topic]);
  };

  const handleUnsub = (topic) => {
    const newArr = subscribedTopic.filter((item) => item !== topic);
    setSubscribedTopic(newArr);
    unSub(topic);
  };
  getsubscribedTopic(subscribedTopic);

  return (
    <div>
      <Form>
        <h2>this is Subscriber section</h2>
        <Form.Group className="mb-3" controlId="form1">
          <Form.Label>Topic</Form.Label>
          <Form.Control type="text" placeholder="Enter the topic" id="outlined-basic"
            autoComplete="off"
            value={values.topic}
            onChange={(e) =>
              setValues((prevState) => ({
                ...prevState,
                topic: e.target.value,
              }))
            } />
          <Form.Label htmlFor="disabledSelect">Qos</Form.Label>
          <Form.Select
              id="demo-simple-select"
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
        </Form.Group>
        <Button variant="primary" disabled={!(connectStatus === "Connected")}
          onClick={() => onSubscribe(values)}>Subscribe</Button>
        <br></br>
        <br></br>
        {subscribedTopic.length > 0
        ? subscribedTopic.map((topic, index) => (
            <div
              key={index}
            >
                  <p style={{fontWeight:"700"}}>{topic}</p>
            
                  <span
                    onClick={() => handleUnsub(topic)}
                  >X</span>
            </div>
          ))
        : null}
      </Form>
    </div>
  );
};

export default Subscriber;
