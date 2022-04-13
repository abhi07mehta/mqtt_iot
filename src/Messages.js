import React, { useEffect, useState } from "react";

const Messages = ({ payload, subscribedTopic })=>{
    
    const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (payload.topic) {
      setMessages((messages) => [...messages, payload]);
    }
  }, [payload]);
    return(
        <div>
            <h2>
                message will display here
            </h2>
            {messages.map((m, index) => (
        <>
          {subscribedTopic.includes(m.topic) && (
            <div
              key={index}
            >
              <p style={{ fontWeight: "700" }}>Topic = {m.topic}</p>
              <p>{m.message}</p>
            </div>
          )}
        </>
      ))}
        </div>
    );
}

export default Messages;