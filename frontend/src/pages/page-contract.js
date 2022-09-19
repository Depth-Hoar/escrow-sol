// import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Button, Paper, Stack, Typography, TextField, Grid, Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { getBlockchain, showError } from "./utils/common";
import ContractAddress from "../abis/contract-address.json";
import WalletCard from "../components/wallet.js";
// import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Masonry from '@mui/lab/Masonry';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import React, { useEffect, useState } from "react";
// import { Home } from './page-home';
import { showError, getBlockchain } from "../utils/common";
import { array } from './page-home';


// const heights = [150, 150];

// const StyledAccordion = styled(Accordion)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   color: theme.palette.text.secondary,
// }));

// const data = await getBlockchain();

// const theme = createTheme({
//   palette: {
//     primary: {
//     },
//   },
// });




//================================= You need to figure out how to import form data ==========================================
function Contract({ blockchain }) {

  const [newEscrow, setNewEscrow] = useState({
    seller: '',
    buyer: '',
    percentage: '',
    blockNumber: ''
  });

  const Escrow = array[0];


  const initEscrow = async () => {
    try {
      // await Escrow.initEscrow(sellerAdd, buyerAdd, feePercent, blockNumber);
      // console.log(id,'id');
    } 
    catch (error) {
      showError(error);
    }
    // handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const loadEscrow = escrow;
    // console.log(loadEscrow, 'loadEscrow');
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const newEscrow = new ethers.Contract(loadEscrow, EscrowArtifact, provider);
    // array.push(newEscrow);
    // console.log(array, 'array1')
    console.log(newEscrow, 'newEscrow');
  }

  const handleChange = async (e) => {
    // console.log(e.target.value,'target');
    const {name, value} = e.target
    setNewEscrow((prev) => {
      return{...prev, [name]: value }
    })

  }

  console.log(newEscrow, 'newEscrow');



  
  // console.log(Escrow,'Escrow')



  return (
    <div>
    <div className="App">
      <header className="App-header">
      {/* <ThemeProvider theme={theme}> */}
        <Typography variant="h3" p={3} pb={6} >
          Escrow Contract Options
        </Typography>
        <Grid container sx={{ justifyContent: 'center' }}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit} >
          <TextField 
            onChange={handleChange}
            name='seller'
            // onChange={(e) => setNewEscrow(e.target.value)}
            id="outlined-basic" 
            label="Seller Address" 
            variant="outlined" 
            />
          <TextField 
            onChange={handleChange}
            name='buyer'
            // onChange={(e) => setNewEscrow(e.target.value)}
            id="outlined-basic" 
            label="Buyer Address" 
            variant="outlined" 
            />
          <TextField 
            onChange={handleChange}
            name='percentage'
            // onChange={(e) => setNewEscrow(e.target.value)}
            id="outlined-basic" 
            label="Fee Percentage" 
            variant="outlined" 
            />
          <TextField 
            onChange={handleChange}
            name='blockNumber'
            // onChange={(e) => setNewEscrow(e.target.value)}
            id="outlined-basic" 
            label="Block Number" 
            variant="outlined" 
            />
          <Button variant='contained' 
            // onClick={initEscrow}
            type='submit' >
          Init Escrow
          </Button>
          </form>

          <Box sx={{ width: 300,'& button': { m: 2 } }} >
          <Button variant='contained' >Buyer Deposit</Button>
          <Button variant='contained' >Escrow Approval</Button>
          <Button variant='contained' >Cancel Escrow</Button>
          </Box>
        </Grid>

        <Grid container sx={{ justifyContent: 'center' }}>
        <WalletCard  />
        {/* <p>
          {(contractAddress).toString()}
        </p> */}
        </Grid>
      {/* </ThemeProvider> */}


      </header>
    </div>
    </div>
  );
}

// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0x90F79bf6EB2c4f870365E785982E1f101E93b906, 1, 100000000

export default Contract;