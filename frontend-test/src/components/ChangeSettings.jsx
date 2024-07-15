import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSentences,addSentence,deleteSentence } from "../app/sentenceReducer";
import checkAvailableId from "../functions/checkAvailableId";
import { callAlert } from "../app/alertReducer";
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";

const ChangeSettings = ({setChangeSettingsOpen, changeSettingsOpen}) => {
    const dispatch = useDispatch();
    const {sentences} = useSelector(state => state.sentence);
    const [newSentence, setNewSentence] = useState("")
    const [activeChange, setActiveChange] = useState({
        id: "",
        txt: ""
    })

    const inputRef = useRef();

    const inputHandler = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setActiveChange({
            id: id,
            txt: value
        })
    }

    const updateSentenceHandler = (e) => {
        e.preventDefault();
        let check = true;

        for(let txt of sentences){
            if(txt.sentence === activeChange.txt) {
                check = false;
                dispatch(callAlert([{text: "Nie możesz dodawać takich samych treści", type: "info", id:uuidv4()}]))
                break;
            }
        }
        if(check) {
            dispatch(updateSentences({id: parseInt(activeChange.id), sentence: activeChange.txt}))
            dispatch(callAlert([{text: `Zmieniłeś treść o id ${activeChange.id}`, type: "success", id:uuidv4()}]))
            setActiveChange({id: "",txt: ""})
        }
    }

    const addNewSentenceHandler = (value) => {
        let check = true;
        let newSentence = {
            id: checkAvailableId(sentences),
            sentence: value
        }
        for(let txt of sentences){
            if(txt.sentence === value) {
                check = false;
                dispatch(callAlert([{text: "Nie możesz dodawać takich samych treści", type: "info", id:uuidv4()}]))
                break;
            }
        }
        if(check) {
            inputRef.current.value = "";
            dispatch(addSentence(newSentence))
        }
  
    }

    const deleteTextHandler = (e,id) => {
        e.preventDefault();
        dispatch(deleteSentence(id));
    }
    
    return (
        <dialog id="changeSettings" className="flex column space-between">
            <button id="close-btn" onClick={()=>setChangeSettingsOpen(false)}>
                <FontAwesomeIcon icon={faXmark} />                     
            </button>
            <form onChange={inputHandler} className="input-container flex align-flex-start column justify-center">
                <h2>Ustawienia</h2>
                {sentences.map((el)=> (
                    <div className="input flex align-center space-between" key={el.id}>
                        <label htmlFor={el.sentence}>{el.sentence}</label>
                        <input maxLength={255} id={el.id} placeholder="Wpisz nową treść" />
                        {activeChange.id == el.id ? (
                            <button onClick={(e)=>updateSentenceHandler(e)}>
                                <FontAwesomeIcon color="#A3A8B6" icon={faCheck} />                        
                            </button>
                        ):<button onClick={(e)=>deleteTextHandler(e,el.id)}>
                        <FontAwesomeIcon color="#A3A8B6" icon={faTrash} />                        
                    </button>}
                    </div>
                ))}
                
            </form>
            <div className="add-sentence flex column align-center space-center">
                <hr />
                <div className="input">
                    <label htmlFor="add-new-sentence">Dodaj nową treść</label>
                    <input ref={inputRef} onChange={(e)=>setNewSentence(e.target.value)} id="add-new-sentence" className="input" type="text" maxLength={255}/>
                </div>
                <button onClick={()=>addNewSentenceHandler(newSentence)}>Dodaj treść</button>
            </div>
        </dialog>
    )
    
}


export default ChangeSettings