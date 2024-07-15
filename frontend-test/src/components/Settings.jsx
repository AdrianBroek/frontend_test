import React from "react";
import { showAuthor, hideAuthor } from "../app/authorReducer";
import { resetText } from "../app/textReducer";
import { useDispatch } from "react-redux";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Settings = ({setPopupOpen, popupOpen, setChangeSettingsOpen, changeSettingsOpen}) => {

    const dispatch = useDispatch();
    
    const resetOptions = () => {
        dispatch(resetText())
        dispatch(hideAuthor())
    }

    return (
        <div className={popupOpen ? "open options-block flex column align-center" : "options-block flex column align-center"}>
            <div className="button-block flex column">
                <button onClick={()=>resetOptions()} className="flex align-center justify-center">
                    <FontAwesomeIcon color="#151418" icon={faChevronRight} />                        
                    <p>Zresetuj ustawienia</p>
                </button>
                <button onClick={()=>dispatch(showAuthor())} className="flex align-center justify-center">
                    <FontAwesomeIcon color="#151418" icon={faChevronRight} /> 
                    <p>Pokaż dane osobowe</p>
                </button>
                <button onClick={()=>setChangeSettingsOpen(true)} className="flex align-center justify-center">
                    <FontAwesomeIcon color="#151418" icon={faChevronRight} /> 
                    <p>Zmień ustawienia</p>
                </button>
            </div>
        </div>
    )
}

export default Settings;