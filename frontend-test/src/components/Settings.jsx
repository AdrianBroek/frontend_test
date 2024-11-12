import React from "react";
import { showAuthor, hideAuthor } from "../app/authorReducer";
import { resetText } from "../app/textReducer";
import { useDispatch } from "react-redux";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchSentences } from "../app/sentenceReducer";
import {v4 as uuidv4} from 'uuid';
import { callAlert } from "../app/alertReducer";

const Settings = ({setPopupOpen, popupOpen, setChangeSettingsOpen, changeSettingsOpen}) => {

    const dispatch = useDispatch();
    
    const resetOptions = () => {
        dispatch(resetText())
        dispatch(hideAuthor())
        dispatch(fetchSentences())
        dispatch(callAlert([{text: "Pomyślnie zresetowano ustawienia", type: "success", id:uuidv4()}]))
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