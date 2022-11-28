import { ethers } from "ethers";
import abi from "./Bank.json";
import byteCode from "./byteCode.json";

export const bankAddress = "0x02caE2E1B1b64cDe3C649B85B491E3762100Cd7c";

export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();

export const ABI = abi;
export const BYTECODE = byteCode;

export const bankContract = new ethers.Contract(bankAddress, abi, signer);
