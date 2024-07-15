import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import AlertContainer from '../components/AlertContainer';
import Settings from '../components/Settings';


const MainPage = () => {


    const [popupOpen, setPopupOpen] = useState(false);
    const [changeSettingsOpen, setChangeSettingsOpen] = useState(false);
        
    return (
        <>
            <Header />
            <Main />
            <Footer popupOpen={popupOpen} setPopupOpen={setPopupOpen} setChangeSettingsOpen={setChangeSettingsOpen} changeSettingsOpen={changeSettingsOpen}/>
            <AlertContainer />
            <Settings popupOpen={popupOpen} setPopupOpen={setPopupOpen} setChangeSettingsOpen={setChangeSettingsOpen} changeSettingsOpen={changeSettingsOpen} />
        </>
    )
}

export default MainPage;