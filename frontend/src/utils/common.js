import { ethers, Contract } from "ethers";
import FactoryArtifact from "../abis/Factory.json";
import ContractAddress from "../abis/contract-address.json";
import Swal from "sweetalert2";

// connect ethers to metamask
const getBlockchain = () =>
  new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();

      const FactoryContract = new Contract(
        ContractAddress.Factory,
        FactoryArtifact.abi,
        signer
      );

      resolve({ signerAddress, FactoryContract });
    }
    resolve({ signerAddress: undefined, FactoryContract: undefined });
  });

function showError(error) {
  Swal.fire({
    icon: "error",
    title: "Transaction Failed",
    text: error.toString(),
  });
}

export { getBlockchain, showError };