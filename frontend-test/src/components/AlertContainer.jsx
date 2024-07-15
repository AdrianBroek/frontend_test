import React from "react";
import AlertComponent from "./Alert";
import { useSelector } from "react-redux";

const AlertContainer = () => {
    const {alertList} = useSelector(state => state.alert);

    return (
        <div id='alert-container'>
            {alertList.map((alert)=> (
                <AlertComponent key={alert.id} text={alert.text} type={alert.type} id={alert.id}/>
            ))}
        </div>
    )
}

export default AlertContainer