import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {getRandomInt} from '../functions/getRandomNumber'

// RTK
import { fetchSentences } from "../app/sentenceReducer";
import { addText, replateText } from "../app/textReducer";
import { useDispatch, useSelector } from "react-redux";

import { callAlert } from "../app/alertReducer";

import {v4 as uuidv4} from 'uuid';

const Main = () => {

    const formRef = useRef();
    const thirdInput = useRef();
    const divRef = useRef();

    const [activeRadio, setActiveRadio] = useState("")
    const [activeText, setActiveText] = useState({
        id: "",
        txt: ""
    })
    // for elipsis
    const [blockWidth, setBlockWidth] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const dispatch = useDispatch();
    const {text,additionalText} = useSelector(state=> state.text); 
    const {sentences} = useSelector(state=> state.sentence); 
    

    // zmniejszane nagłówku z elipsis
    const updateDimensions = () => {
        if (divRef.current) {
          setBlockWidth(divRef.current.offsetWidth);
        }
        const newWindowWidth = window.innerWidth;
        setWindowWidth(newWindowWidth);
      };
    
      useLayoutEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => {
          window.removeEventListener('resize', updateDimensions);
        };
      }, []);

    // pobierz teksty po wczytaniu komponentu
    useEffect(()=> {
        if(!localStorage['sentences']){
            dispatch(fetchSentences())
        }
    }, [])

    const addTextHandler = (newText) => {
        if(!newText.id) {
            return dispatch(callAlert([{text: "Brak wybranego elementu", type: "error", id:uuidv4()}]))
        }
        // jesli aktywny nie tekst jest 1 lub 2 elementem to losuj dalej id z opcji 3
        const id = sentences.findIndex(el => el.id === newText.id);
        if(id !== 0 && id !== 1){
            radioFormHandler(thirdInput.current.id)
        }

        // jesli nie istnieje nowo dodawana treść
        const avail_check = additionalText.some((el) => el.id === newText.id)
        
        if(!avail_check) {
            dispatch(addText(newText))
            dispatch(callAlert([{text: "Tekst doklejony.", type: "success", id:uuidv4()}]))
        } else {
            dispatch(callAlert([{text: "Tekst już istnieje.", type: "error", id:uuidv4()}]))
        }
    }

    const replaceTextHandler = (newText) => {
        if(!newText.id) {
            return dispatch(callAlert([{text: "Wybierz którąś z opcji", type: "error", id:uuidv4()}]))
        }

        if(additionalText.length == 0){
            return dispatch(callAlert([{text: "Nie możesz zastąpić tekstu który nie istnieje", type: "error", id:uuidv4()}]))
        }else {

            // jesli aktywny nie tekst jest 1 lub 2 elementem to losuj dalej id z opcji 3
            const id = sentences.findIndex(el => el.id === newText.id);
            if(id !== 0 && id !== 1){
                radioFormHandler(thirdInput.current.id)
            }
            
            // jesli ostatni element z dodatkowych wyrazow ma id rowne zastępowanego, zastąp element
            const double_check = additionalText[additionalText.length - 1].id === newText.id

            if(additionalText.length === 0){
                dispatch(callAlert([{text: "Nie możesz podmienić tekstu, jeśli żaden tekst nie istnieje", type: "warning", id:uuidv4()}]))
            }
            else if(!double_check) {
                dispatch(replateText(newText))
                dispatch(callAlert([{text: "Tekst zastąpiony.", type: "success", id:uuidv4()}]))
            } else {
                dispatch(callAlert([{text: "Nie możesz podmienić takiego samego tekstu.", type: "error", id:uuidv4()}]))
            }
        }
    }

    const radioFormHandler = (e) => {
        switch(e) {
            case "first":
                if(sentences[0]){
                    setActiveText({
                        id: sentences[0].id,
                        txt: sentences[0].sentence
                    })
                } else {
                    dispatch(callAlert([{text: "Brak tekstu o indeksie 0.", type: "error", id:uuidv4()}]))
                }
                
                break;
            case "second":
                if(sentences[1]) {
                setActiveText({
                    id: sentences[1].id,
                    txt: sentences[1].sentence
                })
                } else {
                    dispatch(callAlert([{text: "Brak tekstu o indeksie 1.", type: "error", id:uuidv4()}]))
                }
                break;
            case "third":
                if(sentences[3]){
                    const randomNumber = getRandomInt(2, sentences.length - 1);
                    setActiveText({
                        id: sentences[randomNumber].id,
                        txt: sentences[randomNumber].sentence
                    })
                } else {
                    dispatch(callAlert([{text: "Brak tekstu o indeksie 2 lub większym.", type: "error", id:uuidv4()}]))
                }
                
                break;
        }
    }

    return (
        <main>
            <div className="container">
                <section className="flex align-center column">
                    <h1>Nagłówek H1</h1>
                    <hr/>
                </section>
                <section ref={divRef}>
                    <article className="first">
                        <h3>Blok pierwszy</h3>
                        <form 
                            ref={formRef}
                            onChange={(e) => radioFormHandler(e.target.id)}
                            className="flex column align-center align-start">
                            <div onClick={()=>setActiveRadio("first")} className="option flex align-center">
                                <div className="input-container">
                                    <input  type="radio" id="first" name="options"/>
                                    <div className="custom-radio">
                                        <div className="circle flex align-center space-center">
                                            {activeRadio === "first" ? (
                                                <div className="radio-active" />
                                            ):""}
                                        </div>
                                    </div>
                                </div>
                                <label htmlFor="first">Opcja pierwsza</label>
                            </div>

                            <div onClick={()=>setActiveRadio("second")} className="option flex align-center">
                                <div className="input-container">
                                    <input  type="radio" id="second" name="options"/>
                                    <div className="custom-radio flex align-center space-center">
                                        <div className="circle flex align-center space-center">
                                            {activeRadio === "second" ? (
                                                <div className="radio-active" />
                                            ):""}
                                        </div>
                                    </div>
                                </div>
                                <label htmlFor="second">Opcja druga</label>
                            </div>

                            <div onClick={()=>setActiveRadio("third")} className="option flex align-center">
                                <div className="input-container">
                                    <input  type="radio" id="third" name="options" ref={thirdInput}/>
                                    <div className="custom-radio flex align-center space-center">
                                        <div className="circle flex align-center space-center">
                                            {activeRadio === "third" ? (
                                                <div className="radio-active" />
                                            ):""}
                                        </div>
                                    </div>
                                </div>
                                <label htmlFor="third">Opcja trzecia</label>
                            </div>

                        </form>
                    </article>
                    <article className="second">
                        <h3>Blok drugi</h3>
                        <div className="flex align-center space-center button-container">
                            <button onClick={()=>replaceTextHandler(activeText)}>Zastąp</button>
                            <button onClick={()=>addTextHandler(activeText)}>Doklej</button>
                        </div>
                    </article>

                    <article className="third" style={windowWidth > 960 ? {maxWidth: blockWidth/3} : {maxWidth: blockWidth}}>
                        <h3>Blok z długą nazwą która sama się przytnie ...</h3>
                        <div id="long-text">
                            <p>{text}</p>
                            {additionalText.map((el)=> (
                                <p>{el.txt}</p>
                            ))}
                        </div>
                    </article>
                </section>
                

            </div>
        </main>
    )
}

export default Main;