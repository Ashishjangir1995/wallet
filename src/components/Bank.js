import { useState } from "react";
import { ethers } from "ethers";
import React from "react";
import { bankContract, signer, bankAddress, ABI, BYTECODE } from "../utils/constants";

function Bank() {
	const [Balance, setBalance] = useState("");
	const [DepositBalance, setDepositBalance] = useState("");
	const [WithdrawBalance, setWithdrawBalance] = useState("");
	const [Address, setAddress] = useState("");
	const [Funds, setFunds] = useState("");
	const [ContractAddress, setContractAddress] = useState("");
	const [CurrentAccount, setCurrentAccount] = useState("");
	// =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	const connectWallet = async () => {
		if (!window.ethereum) {
			return alert("please install metamask");
		}
		const address = await window.ethereum.request({ method: "eth_requestAccounts" });
		setCurrentAccount(address[0]);
	};

	const createContract = async () => {
		let factory = new ethers.ContractFactory(ABI, BYTECODE, signer);
		let contract = await factory.deploy();
		await contract.deployTransaction.wait();
		console.log(contract.deployTransaction);
		setContractAddress(contract.deployTransaction.creates);
		alert(contract.deployTransaction.hash);
	};

	const checkBalance = async () => {
		const balTx = await bankContract.getfunds();
		setBalance(ethers.utils.formatEther(balTx.toString()));
	};

	const handleDepositEther = (e) => {
		setDepositBalance(e.target.value);
	};

	const handleDeposit = async () => {
		const amount = ethers.utils.parseEther(DepositBalance);
		const tx = { to: bankAddress, value: amount };
		const depositTx = await signer.sendTransaction(tx);
		await depositTx.wait();
		alert(depositTx.hash);
	};

	const handleWithdrawEther = (e) => {
		setWithdrawBalance(e.target.value);
	};

	const handleWithdraw = async () => {
		const amount = ethers.utils.parseEther(WithdrawBalance);
		const withdrawTx = await bankContract.withDrawFunds(amount);
		await withdrawTx.wait();
		alert(withdrawTx.hash);
	};

	const handleAddress = (e) => {
		setAddress(e.target.value);
	};

	const handleFunds = (e) => {
		setFunds(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const amount = ethers.utils.parseEther(Funds);
		const sendFundsTx = await bankContract.transferFunds(Address, amount);
		await sendFundsTx.wait();
		alert(sendFundsTx.hash);
	};

	return (
		<div className="flex flex-row space-x-24 mt-20">
			<div>
				<div className="mt-16">
					<div>
						<p className="text-2xl">Create Contract</p>
						<span>
							<button
								onClick={createContract}
								className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded-full"
							>
								create contract
							</button>
							<p className="">
								<span className="font-extrabold">{ContractAddress}</span>
							</p>
						</span>
					</div>
				</div>
				<div className="mt-20">
					<div>
						<span>
							<button
								onClick={connectWallet}
								className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded-full"
							>
								Connect Wallet
							</button>
							<p className="">
								<span className="font-extrabold">{CurrentAccount}</span>
							</p>
						</span>
					</div>
				</div>
			</div>

			{/* =>>>>>>>............................................................................. */}
			<div>
				<div className="mt-14">
					<p className="text-2xl">Deposit Ether</p>
					<label>
						Amount
						<span className="ml-2 mr-2 text-slate-900">
							<input
								className="rounded-full"
								type="number"
								min="0"
								value={DepositBalance}
								onChange={handleDepositEther}
							/>
						</span>
					</label>
					<button
						onClick={handleDeposit}
						className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded-full mt-2"
					>
						Deposit
					</button>
				</div>

				{/* =>>>>>>>............................................................................. */}

				<div className="mt-14">
					<h3 className="text-2xl">Withdraw Funds</h3>
					<label>
						Amount
						<span className="ml-2 mr-2 ">
							<input
								className="rounded-full text-slate-900"
								type="number"
								min="0"
								value={WithdrawBalance}
								onChange={handleWithdrawEther}
							/>
						</span>
					</label>
					<button
						onClick={handleWithdraw}
						className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded-full mt-2"
					>
						Withdraw
					</button>
				</div>
			</div>
			{/* =>>>>>>>........................................................................ */}
			<div>
				<div className="mt-14">
					<h3 className="text-2xl">Transfer funds</h3>
					<form onSubmit={handleSubmit}>
						<div className="form-group mb-6">
							<div className="mt-3"></div>
							<div className="space-y-2">
								<div>
									<label>
										Address
										<input
											className="ml-2 rounded-full text-slate-900"
											type="text"
											value={Address}
											onChange={handleAddress}
										/>
									</label>
								</div>
								<div>
									<label>
										Amount
										<span>
											<input
												className="ml-2 rounded-full text-slate-900"
												type="number"
												value={Funds}
												onChange={handleFunds}
											/>
										</span>
									</label>
								</div>
							</div>
							<input
								className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded-full mt-4"
								type="submit"
								value="Transfer"
							/>
						</div>
					</form>
				</div>
				<div className="mt-3">
					<div>
						<span>
							<button
								onClick={checkBalance}
								className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded-full"
							>
								check balance
							</button>
							<p className="">
								<span className="font-extrabold">{Balance}</span>
								<span className="ml-2">Ether</span>
							</p>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bank;
