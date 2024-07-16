import './styles/App.scss';
import { useSelector,useDispatch } from 'react-redux';
import { changeSentences } from './app/sentenceReducer';
import { useEffect } from 'react';
import MainPage from './pages/MainPage';
import { resetText } from './app/textReducer';
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
    // reset text
    dispatch(resetText())
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
