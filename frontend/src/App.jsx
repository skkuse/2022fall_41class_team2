import Routes from './Routes';

// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import Home from "./pages/Home";

import styled from 'styled-components';
import React, { createContext, FC, ReactElement, ReactNode, useContext, useEffect } from 'react';

const Background = styled.div`
// max-width: 150px;
`
export const AuthContext = createContext(false);

function App() {
//   const params = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

  return (
    
    // <h1>hello world</h1>
    // <Home />
    <Routes /> 
  );
}


export default App;
