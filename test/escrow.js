const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Factory', function () {

  it('should initiate the factory contract and create a single new Escrow contract', async function () {
		const Factory = await ethers.getContractFactory('Factory');
    factory = await Factory.deploy();
    await factory.deployed();
    await factory.createContract();
    const allEscrowContracts = await factory.getAllContracts();
    expect(allEscrowContracts.length).to.equal(1);
	});

});


describe('Escrow', function () {


  beforeEach(async () => {
    [escrowOwner, seller, buyer] = await ethers.getSigners();
    const EscrowContract = await ethers.getContractFactory('Escrow');
    escrow = await EscrowContract.deploy(escrowOwner.address, 0);
    await escrow.deployed();
    await escrow.initEscrow(seller.address, buyer.address, 10, 100000000);
  });

  it('should initialize a new escrow and return escrowID as 1', async function() {
    escrowID = await escrow.getEscrowID();
    expect(escrowID).to.equal(1);
	});

  it('should give the amount deposited by the buyer in the escrow as 10', async function() {
    await escrow.connect(buyer).depositToEscrow({value: ethers.utils.parseEther('10')});
    balance = await ethers.provider.getBalance(escrow.address);
    expect(balance.toString()).to.equal(ethers.utils.parseEther('10'));
	});

});