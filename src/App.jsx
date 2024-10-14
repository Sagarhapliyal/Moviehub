// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Navbar from "./Componen2/Navbar";

import English from "./Componen2/English";
import HindiMovies from "./Componen2/HindiMovies";

import MovieInfopage from "./Componen2/MovieInfopage";


import Movienew from "./Componen2/Movienew";

function App() {
  return (
    <BrowserRouter>
      <div className="m">
        <div style={{
          backgroundColor:"black"
        }}>
        <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
        
          <Route path="/Englishmovie" element={<English/>} />
          <Route path="/movie/:id" element={<MovieInfopage />} />
          {/* <Route path="/movies/:category" component={MoviesCategoryPage} /> */}
          <Route path="/movies/:category" element={<Movienew/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <>
    <div style={{
      backgroundColor:"black"
    }}>
   <HindiMovies></HindiMovies>
     
      </div>
    </>
  );
}

export default App;
