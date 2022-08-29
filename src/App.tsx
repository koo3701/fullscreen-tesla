import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Open } from './Open';
import { Top } from './Top';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Top />} />
        <Route path='/open' element={<Open />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
