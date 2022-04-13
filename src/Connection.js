import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const Connection = ({ connect, disconnect, connectBtn }) => {
  const [values, setValues] = useState({
    host: "broker.emqx.io",
    port: 8083,
    clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
    username: "",
    password: "",
  });

  const onConnect = (values) => {
    const { host, clientId, port, username, password } = values;
    const url = `ws://${host}:${port}/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    };
    options.clientId = clientId;
    options.username = username;
    options.password = password;
    connect(url, options);
  };

  const handleDisconnect = () => {
    disconnect();
  };
  return (
    <div>
      <Form>
        <h2>this is Connection</h2>
        <Form.Group className="mb-3" controlId="form1">
          <Form.Label>Host</Form.Label>
          <Form.Control
            id="outlined-basic"
            value={values.host}
            onChange={(e) =>
              setValues((prevState) => ({ ...prevState, host: e.target.value }))
            }
          />
          <Form.Label>Port</Form.Label>
          <Form.Control id="outlined-basic"
            value={values.port}
            onChange={(e) =>
              setValues((prevState) => ({ ...prevState, port: e.target.value }))
            } />
          <Form.Label>Client ID</Form.Label>
          <Form.Control id="outlined-basic"
            value={values.clientId}
            onChange={(e) =>
              setValues((prevState) => ({
                ...prevState,
                clientId: e.target.value,
              }))
            } />
        </Form.Group>

        <Form.Group className="mb-3" controlId="form2">
          <Form.Label>UserName</Form.Label>
          <Form.Control id="outlined-basic"
            value={values.username}
            style={{ padding: "0.7em" }}
            onChange={(e) =>
              setValues((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            } />
          <Form.Label>Password</Form.Label>
          <Form.Control id="outlined-basic"
            value={values.password}
            style={{ padding: "0.7em" }}
            onChange={(e) =>
              setValues((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            } placeholder="Password" />
        </Form.Group>

        <Button variant="primary" onClick={() => onConnect(values)}
          style={{ marginRight: "1em" }}>Connect</Button>
        <Button variant="primary" onClick={handleDisconnect}>Disconnect</Button>
        <br></br>
        <br></br>
      </Form>
    </div>
  );
};

export default Connection;
