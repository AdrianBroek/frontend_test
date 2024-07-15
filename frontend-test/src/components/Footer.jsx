import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ChangeSettings from "./ChangeSettings";

const Footer = ({setPopupOpen, popupOpen, setChangeSettingsOpen, changeSettingsOpen}) => {

    return (
        <footer>
            <div className="container flex space-between align-center">
                <figure>
                    <div className="flex column css_is_awesome"> 
                        <p>CSS</p>
                        <p>IS</p>
                        <p>AWESOME</p>
                    </div>
                    <div className="frame"/>
                </figure>
                <div className="nabthat-logo">
                    <p className="flex align-center">nabthat</p>
                </div>
                <div onClick={()=>setPopupOpen(!popupOpen)} 
                className={popupOpen ? "show-block flex column align-center space-center open" : "show-block flex column align-center space-center"} >
                    <button className="flex align-center">
                        <h5>Pokaż</h5>
                        <div className="arrow">
                            <FontAwesomeIcon color="#A3A8B6" icon={faChevronUp} />                        
                        </div>
                    </button>
                </div>
            {changeSettingsOpen ? (
                <ChangeSettings 
                    changeSettingsOpen={changeSettingsOpen}
                    setChangeSettingsOpen={setChangeSettingsOpen}
                />
            ):""}
            </div>

        </footer>
    )
}

export default Footer;