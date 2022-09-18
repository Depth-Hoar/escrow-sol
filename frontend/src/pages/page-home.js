// import './App.css';
// import { BrowserRouter } from 'react-router-dom';
import { Button, Paper, Stack, Typography, TextField, Grid } from "@mui/material";
import { ExpandMore } from '@mui/icons-material';
import ContractAddress from "../abis/contract-address.json";
import EscrowArtifact from "../abis/Escrow.json";
import WalletCard from "../components/wallet.js";
import EscrowList from "../components/escrowList"
// import { red } from '@mui/material/colors';
// import { styled } from '@mui/material/styles';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Masonry from '@mui/lab/Masonry';
// import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Box from '@mui/material/Box';
import { showError, getBlockchain } from "../utils/common";
import React, { useEffect, useState } from "react";

import { ethers, Contract } from "ethers";

import { Outlet, Link, Redirect, useNavigate } from 'react-router-dom';


// const heights = [150, 150];

// const StyledAccordion = styled(Accordion)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   color: theme.palette.text.secondary,
// }));

// const data = await getBlockchain();

const contractAddress = ContractAddress.Factory;
console.log(contractAddress,"contract");

const array = [];
console.log(array, 'array2')

function Home({ blockchain }) {

  // list of escrows
  const [escrows, setEscrows] = useState([]);
  // input
  const [escrow, setEscrow] = useState('');

  const navigate = useNavigate();



  const newEscrow = async () => {
    try {
      await blockchain.factory.createContract();
    } 
    catch (error) {
      showError(error);
    }
    // handleClose();
  };

  useEffect(() => {
    (async () => {
      console.log(blockchain.factory, 'factory');
      blockchain.factory && setEscrows(await blockchain.factory.getAllContracts());
    })();
  }, [blockchain]);

  // console.log(blockchain,'blockchain');

  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadEscrow = escrow;
    console.log(loadEscrow, 'loadEscrow');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newEscrow = new ethers.Contract(loadEscrow, EscrowArtifact, provider);
    console.log(newEscrow, 'newEscrow');
    array.push(newEscrow);
    console.log(array, 'array1')
  

    // const fs = require("fs");

    // // const fs = require("fs");
    // const contractsDir = __dirname + "/../frontend/src/abis";
    // // if (!fs.existsSync(contractsDir)) {
    // //   fs.mkdirSync(contractsDir);
    // // }
    // fs.writeFileSync(
    //   contractsDir + "/escrow-address.json",
    //   JSON.stringify({ Factory: newEscrow.address }, undefined, 2)
    // );
    
  
    navigate('/contract', {replace: true});
  }

  

  return (
    <div>
    <div className="App">
      <header className="App-header">
      <Typography variant="h3" p={3}>
          Escrow Decentralized Application
        </Typography>
        <Box sx={{ minHeight: 377 }} p={10}>
      <Masonry columns={2} spacing={5}>
        <Box sx={{ minHeight: 377 }}>
          <Typography variant='h5'>
            Create a new Escrow Contract
          </Typography>
          <Paper  elevation={3} sx={{ p: 4, padding:10, align: 'left',   display: 'flex'}}>
            The address which creates the new Escrow contract is the owner of the contract. This address is responsible for correctly initializing the buyer and seller addresses as well as resolve disputes.
          </Paper>
          <ExpandMore />
          <Paper  elevation={3} sx={{ p: 4, padding:10, align: 'left',   display: 'flex'}}>
            The buyer can independently deposit ethers into the escrow any number of times.
          </Paper>
          <ExpandMore sx={{paddingRight:20, align: 'left', }} />
          <ExpandMore sx={{paddingLeft:20, align: 'right',   }} />
          <Masonry columns={2} spacing={5} sx={{ padding:5}}>
            <Paper  elevation={3} sx={{ padding:2, align: 'left'}}>
              Both the buyer and the seller need to press the Approve button to get the deal approved. Once both have approved, the escrow will pay out the decided percentage of the contract deposits to the fee and the remaining to the seller automatically.
            </Paper>
            <Paper  elevation={3} sx={{ padding:2, align: 'right'}}>
              In case both the buyer and seller decide not to go ahead with the escrow, both need to press the Cancel button to cancel the escrow. No fee will be charged by the owner in this case and the entire buyer deposit will be transferred back to the buyer.
            </Paper>
          </Masonry>
          <Paper  elevation={3} sx={{ p: 4, padding:10, align: 'left',   display: 'flex'}}>
          Neither the creators of the escrow platform nor the owner will have any authority to launder with the money deposited into the smart contract. But they are no way accountable for any monetary losses incurred.
          </Paper>
          <Button variant='contained' onClick={newEscrow} >
            Create New Escrow Contract
          </Button>
        </Box>
        <Box sx={{ minHeight: 377 }}>
          <Typography variant='h5'>
            Load an existing Escrow Contract
          </Typography>
          <form noValidate autoComplete='off' onSubmit={handleSubmit} >
            <TextField 
              // onSubmit={handleSubmit}
              // onChange={(e) => setEscrow(e.target.value)}
              // onChange={(e) => setEscrow(console.log(e.target.value, 'value'))}
              onChange={(e) => setEscrow(e.target.value)}
              id="outlined-basic" 
              label="Escrow Address" 
              variant="outlined" 
              // error={true}
              />
            {/* <Link className="nav-link" to="/contract"> */}
              <Button 
                // onClick={() => c}
                // onClick={handleSubmit}
                type='submit'
                variant='contained'>
                Load Escrow Contract
              </Button>
            {/* </Link> */}
          </form>
          <Typography variant='h6'>
            All escrows created on this platform:
          </Typography>
          {escrows.map((escrows) => (
         <Typography key={escrows}>
         {/* TODO add key for mapping */}
            {/* {blockchain.factory.allEscrowContracts.toString()} */}
            {escrows}
            {/* {console.log(escrow,'doyoooooooooooooo')} */}
            {/* {console.log(escrow.escrowCount,'escrow count')} */}
          </Typography>
          ))}

        </Box>
      </Masonry>
    </Box>
      </header>
    </div>
    <Grid container sx={{ justifyContent: 'center' }}>
      <WalletCard  />
    </Grid>
    </div>
  );
}

// export {handleSubmit};
export { array };
export default Home;