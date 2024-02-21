import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import EmployeeList from './pages/EmployeeList';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import EmployeeAdd from './pages/EmployeeAdd';
import { NavbarComponent } from './components/NavbarComponent';
import EmployeeView from './pages/EmployeeView';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/add' element={<EmployeeAdd />} />
          <Route path='/view' element={<EmployeeView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
