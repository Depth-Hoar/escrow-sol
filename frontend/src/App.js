import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBlockchain } from './utils/common'
import NavBar from "./components/navbar.js";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, red, deep } from '@mui/material/colors';

import Home from './pages/page-home';
import Contract from './pages/page-contract';
import Init from './pages/page-init';
import Deposit from './pages/page-deposit';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      // main: '#e53939',
      // main: red[500],
      main: '#FF3B80',
    },
    secondary: {
       main: green[500],
    },
  },
  typography: {
    primary: {
      // main: '#e53939',
      main: red[500],
    },
    fontFamily: 'Space Grotesk',
    // fontFamily: 'Space Grotesk',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
});

function App() {

  const [blockchain, setBlockchain] = useState({});

  // TODO reload on account change
  // window.ethereum.on('accountsChanged', () => {
  //   loadAccount(provider, dispatch)
  // })


  useEffect(() => {
    (async () => {
      setBlockchain(await getBlockchain());
    })();
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <NavBar blockchain={blockchain} />
        <Routes>
          <Route path="/" element={<Home blockchain={blockchain} />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/init" element={<Init />} />
          <Route path="/deposit" element={<Deposit />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
