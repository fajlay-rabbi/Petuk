import React from 'react';
import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Reg from './pages/Reg';
import About from './pages/About';
import Track from './pages/Track';
import Rest from './pages/Rest';
import Checkout from './pages/Checkout';
import Trackorder from './pages/Trackorder';
import Adminlogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AddRest from './pages/admin/AddRest';
import AddItem from './pages/admin/AddItem';
import { Route, Routes } from "react-router-dom";




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track" element={<Track />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/reg" element={<Reg />} />
        <Route path="/about" element={<About />} />
        <Route path="/rest" element={<Rest />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/trackorder" element={<Trackorder />} />
        <Route path="/admin" element={<Adminlogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addRest' element={<AddRest />} />
        <Route path='/addItem' element={<AddItem />} />
      </Routes>
    </div>
  );
}

export default App;
