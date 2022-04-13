import React,{useState,useEffect,createContext} from "react";
import ReactDOM from "react-dom";
import Connection from "./Connection";
import Messages from "./Messages";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import mqtt from "mqtt/dist/mqtt";
// import bootstrap from "bootstrap";

export const QosOption = createContext([]);
const qosOption = [
  {
    label: "0",
    value: 0,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
];

const App = ()=>{
    const [client, setClient] = useState(null);
    const [payload, setPayload] = useState({});
    const [connectStatus, setConnectStatus] = useState("Connect");
    const [subscribedTopic, setSubscribedTopic] = useState([]);

    const mqttConnect = (host, mqttOption) => {
        setConnectStatus("Connecting");
        setClient(mqtt.connect(host, mqttOption));
      };
    
      useEffect(() => {
        if (client) {
          client.on("connect", () => {
            setConnectStatus("Connected");
          });
          client.on("error", (err) => {
            console.error("Connection error: ", err);
            client.end();
          });
          client.on("reconnect", () => {
            setConnectStatus("Reconnecting");
          });
          client.on("message", (topic, message) => {
            const payload = { topic, message: message.toString() };
            setPayload(payload);
          });
        }
      }, [client]);
    
      const mqttDisconnect = () => {
        if (client) {
          client.end(() => {
            setConnectStatus("Connect");
          });
        }
      };
    
      const mqttPublish = (context) => {
        if (client) {
          const { topic, qos, payload } = context;
          client.publish(topic, payload, { qos }, (error) => {
            if (error) {
              console.log("Publish error: ", error);
            }
          });
        }
      };
    
      const mqttSub = (subscription) => {
        if (client) {
          const { topic, qos } = subscription;
          client.subscribe(topic, { qos }, (error) => {
            if (error) {
              console.log("Subscribe to topics error", error);
              return;
            }
          });
        }
      };
    
      const getsubscribedTopic = (topic) => {
        setSubscribedTopic(topic);
      };
    
      const mqttUnSub = (subscription) => {
        if (client) {
          client.unsubscribe(subscription, (error) => {
            if (error) {
              console.log("Unsubscribe error", error);
              return;
            }
          });
        }
      };
    return(
        <>
        <Connection connect={mqttConnect}
            disconnect={mqttDisconnect}
            connectBtn={connectStatus} />
             <QosOption.Provider value={qosOption}>
        <Subscriber sub={mqttSub}
                  unSub={mqttUnSub}
                  connectStatus={connectStatus}
                  getsubscribedTopic={getsubscribedTopic}/>
        <Publisher publish={mqttPublish}
                  connectStatus={connectStatus}/>
        <Messages  payload={payload}
                    subscribedTopic={subscribedTopic}/>
                    </QosOption.Provider>
        </>

    );
}

ReactDOM.render(<App />,document.getElementById("root"));
