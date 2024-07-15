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


function App() {
  const dispatch = useDispatch();
  const {sentences} = useSelector(state=> state.sentence);

  const [popupOpen, setPopupOpen] = useState(false);
  const [changeSettingsOpen, setChangeSettingsOpen] = useState(false);

  useEffect(()=> {
    if (localStorage['sentences']) {
      const localStorageSentences = JSON.parse(localStorage.getItem('sentences'));
      // console.log(localStorageSentences)
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
      <Header />
      <Main />
      <Footer popupOpen={popupOpen} setPopupOpen={setPopupOpen} setChangeSettingsOpen={setChangeSettingsOpen} changeSettingsOpen={changeSettingsOpen}/>
      <AlertContainer />
      <Settings popupOpen={popupOpen} setPopupOpen={setPopupOpen} setChangeSettingsOpen={setChangeSettingsOpen} changeSettingsOpen={changeSettingsOpen} />
    </div>
  );
}

export default App;
