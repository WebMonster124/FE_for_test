import './App.css';
import React from 'react'
import { Route, Routes} from 'react-router-dom';
import { Admin } from './pages/index';
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
        <Routes>

          <Route path='/' element ={
              <>
                <Admin></Admin>
              </>
          }/>
        </Routes>
  );
}

export default App;
