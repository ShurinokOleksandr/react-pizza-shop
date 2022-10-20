import React from "react";
import './scss/app.scss'
import Header from "./Components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Card from "./Pages/Card";


function App() {
    const [searchValue,setSearchValue] = React.useState('')
    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">
                    <Routes>
                        <Route element={<Home searchValue={searchValue} />} path={'/'}/>
                        <Route element={<Card/>} path={'/card'}/>
                        <Route element={<NotFound/>} path={'/*'}/>
                    </Routes>
            </div>
        </div>
    );
}

export default App;
