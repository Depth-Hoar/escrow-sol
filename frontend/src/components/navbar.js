import './navbar.css';
import { ThemeProvider, AppBar, Toolbar, Button, Typography, Box, Link } from '@mui/material'
import { Menu } from '@mui/icons-material';
// import { getBlockchain, showError } from "./utils/common.js";
import { showError } from "../utils/common";
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Blockies from 'react-blockies';
import config from '../config';

const NavBar = ({ blockchain }) => {

  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainID, setchainID] = useState("0x7A69");

  const navigate = useNavigate();

  const loadChainId = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainId } = await provider.getNetwork();
    setchainID(chainId);
  }

  useEffect(() => {
    loadChainId()
  })
  
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);


  const accountsChanged = async (newAccount) => {
    // setAccount(newAccount);
    // console.log(newAccount,'newaccount');
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setAccount(newAccount.toString());
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
      setErrorMessage("There was a problem connecting to MetaMask");
    }
    window.ethereum.on("accountsChanged", accountsChanged)
  };

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await accountsChanged(res[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };
  
  useEffect(() => {
    connectHandler();
  })

  const chainChanged = () => {
    setErrorMessage(null);
    setAccount(null);
  };

  const networkHandler = async (event) => {
    await window.ethereum.request({ 
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: event.target.value }]
    })
    window.location.reload();
  }

  const home = () => {
    navigate('/', {replace: true});
    window.location.reload();
  }

  console.log(account, 'account')
  
  return (
<Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
      {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton> */}
          {/* <div onClick={home}> */}
        <Typography variant="h6"
            href="#"
            noWrap
            component="div"
            onClick={home}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          Escrow DAPP
        </Typography>
        <div>
          <select name='networks' id='networks' value={config[chainID] ? `0x${chainID.toString(16).toUpperCase()}` : `0`} onChange={networkHandler}>
            <option value="0x7E6" >Beresheet</option>
            <option value="0x5" >Goerli</option>
            <option value="0x7A69" >Local Host</option>
          </select>
        </div>
        <Typography       
          sx={{ pl:2}}
          variant="h6" 
          component="div">
          {balance ? 
            <Typography>Balance: {Number(balance).toFixed(4)} </Typography> 
            : <p href=" ">{''}</p>
          }
        </Typography>
        <Typography 
          sx={{ pl:2}}
          variant="h6" 
          component="div">
          {/* Ternary operator if else in line. if account show account if no account leave empty string */}
          {account ? 
            <Typography sx={{ pl:2,  }}>
              Account: {account.slice(0,5) + '...' + account.slice(38,42)} 
              <Blockies
                // account={account}
                seed={account} //TODO seed should work instead of account
                size={6}
                scale={3}
                color='#2187D0'
                bgColor='#F1F2F9'
                spotColor='#767F92'
                className='identicon' 
                />
            </Typography> 
            : <Button
                variant='contained'
                onClick={connectHandler}>
                Connect Account
              </Button>
          }
        </Typography>
      </Toolbar>
    </AppBar>
    </Box>
    

  );
};

export default NavBar;
