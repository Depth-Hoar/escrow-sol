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

  const Escrow = array[0];
  // console.log(newEscrow, 'new escrow!!')

  const initEscrow = async (newEscrow) => {
    try {
      // await Escrow.initEscrow();
      const id = await Escrow.getEscrowID();
      // console.log(blockchain.newEscrow, 'newEscrow');
      // console.log(Home.newEscrow, 'newEscrow!!!');
      console.log(id,'id');
    } 
    catch (error) {
      showError(error);
    }
    // handleClose();
  };

  
  console.log(Escrow,'Escrow')



  return (
    <div>
    <div className="App">
      <header className="App-header">
      {/* <ThemeProvider theme={theme}> */}
        <Typography variant="h3" p={3} pb={6} >
          Escrow Contract Options
        </Typography>
        <Grid container sx={{ justifyContent: 'center' }}>
        <form noValidate autoComplete='off' >
          <TextField 
            id="outlined-basic" 
            label="Seller Address" 
            variant="outlined" 
            />
          <TextField 
            id="outlined-basic" 
            label="Buyer Address" 
            variant="outlined" 
            />
          <TextField 
            id="outlined-basic" 
            label="Fee Percentage" 
            variant="outlined" 
            />
          <TextField 
            id="outlined-basic" 
            label="Block Number" 
            variant="outlined" 
            />
          <Button variant='contained' onClick={initEscrow} >
          Init Escrow
          </Button>

          <Box sx={{ width: 300,'& button': { m: 2 } }} >
          <Button variant='contained' >Buyer Deposit</Button>
          <Button variant='contained' >Escrow Approval</Button>
          <Button variant='contained' >Cancel Escrow</Button>
          </Box>
          </form>
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

export default Contract;