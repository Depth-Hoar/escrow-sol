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
import { ethers } from "ethers";
import EscrowArtifact from "../abis/Escrow.json";



function Contract({ blockchain }) {

  const [newEscrow, setNewEscrow] = useState({
    seller: '',
    buyer: '',
    percentage: '',
    blockNumber: ''
  });
  const [amount, setAmount] = useState(0);

  const Escrow = array[0];

  const initEscrow = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      try {
      // console.log(Escrow);
      // const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      // console.log(accounts);
      const init = await Escrow.initEscrow(newEscrow.seller, newEscrow.buyer, newEscrow.percentage, newEscrow.blockNumber);
      console.log(init,'init');
    } 
    catch (error) {
      showError(error);
    }
    // handleClose();
  }};

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(newEscrow, 'newEscrow');
  }

  const depositToEscrow = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      try {
      await Escrow.depositToEscrow({ value: amount });
      const balance = await Escrow.totalEscrowBalance();
      console.log(balance.toString(),'escrow balance');
    } 
    catch (error) {
      showError(error);
    }
    // handleClose();
  }};

  const approve = async () => {
    if (window.ethereum) {
      try {
      const approved = await Escrow.approveEscrow();
      console.log(approved, 'approved');
      const approvalState = await Escrow.checkEscrowStatus();
      console.log(approvalState, 'approvalState');
    } 
    catch (error) {
      showError(error);
    }
  }};

  const handleChange = async (e) => {
    // console.log(e.target.value,'target');
    const {name, value} = e.target
    setNewEscrow((prev) => {
      return{...prev, [name]: value }
    })

  }

  // console.log(newEscrow, 'newEscrow');
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
        <Box sx={{ width: 300,'& button': { m: 2 } }} >
        <form noValidate autoComplete='off' onSubmit={handleSubmit} >
          <TextField 
            onChange={handleChange}
            name='seller'
            id="outlined-basic" 
            label="Seller Address" 
            variant="outlined" 
            />
          <TextField 
            onChange={handleChange}
            name='buyer'
            id="outlined-basic" 
            label="Buyer Address" 
            variant="outlined" 
            />
          <TextField 
            onChange={handleChange}
            name='percentage'
            id="outlined-basic" 
            label="Fee Percentage" 
            variant="outlined" 
            />
          <TextField 
            onChange={handleChange}
            name='blockNumber'
            id="outlined-basic" 
            label="Block Number" 
            variant="outlined" 
            />
          <Button variant='contained' 
            onClick={initEscrow}
            type='submit' 
            >
          Init Escrow
          </Button>
          </form>

          <Typography variant="h5" p={3} pb={1} >
            Buyer Deposit
          </Typography>

          <TextField 
            // onChange={handleChange}
            name='deposit'
            onChange={(e) => setAmount(e.target.value)}
            // onChange={(e) => setNewEscrow(e.target.value)}
            id="outlined-basic" 
            label="Deposit Amount" 
            variant="outlined" 
            />


          <Button variant='contained' onClick={depositToEscrow} >Buyer Deposit</Button>
          <Button variant='contained' onClick={approve} >Escrow Approval</Button>
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

// 0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, 10, 100000000

export default Contract;