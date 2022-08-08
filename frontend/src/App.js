import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Home from './pages/page-home';
import Contract from './pages/page-contract';
import Init from './pages/page-init';

import ContractAddress from "./abis/contract-address.json";


// const heights = [150, 150];

// const StyledAccordion = styled(Accordion)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   color: theme.palette.text.secondary,
// }));

// const data = await getBlockchain();

const contractAddress = ContractAddress.Factory;
console.log(contractAddress,"contract");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/init" element={<Init />} />
      </Routes>
      
    </Router>
  );
}

export default App;
