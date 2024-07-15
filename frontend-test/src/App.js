import './styles/App.scss';
// components
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import AlertContainer from './components/AlertContainer';
import { useSelector,useDispatch } from 'react-redux';
import { changeSentences } from './app/sentenceReducer';
import { useEffect, useState } from 'react';
import Settings from './components/Settings';
import MainPage from './pages/MainPage';
// router 
import { Routes, Route, useLocation, } from "react-router-dom"


function App() {
  const dispatch = useDispatch();
  const {sentences} = useSelector(state=> state.sentence);
  const location = useLocation()

  useEffect(()=> {
    if (localStorage['sentences']) {
      const localStorageSentences = JSON.parse(localStorage.getItem('sentences'));
      dispatch(changeSentences(localStorageSentences));
    } else {
        localStorage.setItem('sentences', JSON.stringify(sentences));
    }
  }, [])

  useEffect(()=> {
    localStorage.setItem('sentences', JSON.stringify(sentences));
  }, [sentences])


  return (
    <div className="App">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
