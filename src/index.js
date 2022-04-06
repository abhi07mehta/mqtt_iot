import React from "react";
import ReactDOM from "react-dom";
import Connection from "./Connection";
import Messages from "./Messages";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";

const App = ()=>{
    return(
        <>
        <Connection />
        <Subscriber/>
        <Publisher/>
        <Messages/>
        </>

    );
}

ReactDOM.render(<App />,document.getElementById("root"));
