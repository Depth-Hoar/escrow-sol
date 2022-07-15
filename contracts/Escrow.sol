// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

// makes new escrow contracts
contract Factory {
    address[] public allEscrowContracts;
    uint256 public escrowCount;
    address public factoryOwner;

    constructor() {
        factoryOwner = msg.sender;
        escrowCount = 0;
    }

    function createContract() public {
        address newContract = address(new Escrow(factoryOwner, escrowCount++));
        allEscrowContracts.push(newContract);
    }

    function getAllContracts() public view returns (address[] memory) {
        return allEscrowContracts;
    }

    function getByID(uint256 queryID) public view returns (address) {
        return allEscrowContracts[queryID];
    }
}

// TODO
// [X] initialize escrow
// [X] deposit to escrow
// [X] approve escrow
// [ ] cancel escrow
// [ ] destroy escrow
// [ ] get all deposits
// [ ] check escrow status
// [ ] get escrow address
// [ ] has buyer approved
// [ ] has seller approved
// [ ] get fee amount
// [ ] get seller amount
// [ ] total escrow amount
// [ ] has escrow expired
// [ ] get block number
// [X] payout from escrow
// [X] fee
// [ ] refund
// [ ] fall back stop anyother deposits to account
// [ ] destroy escrow

contract Escrow {
    address public seller;
    address public buyer;
    address public escrowOwner;

    uint256 public blockNumber;
    uint256 public feePercent;
    uint256 public escrowID;
    uint256 public escrowCharge;

    bool public sellerApproval;
    bool public buyerApproval;

    uint256[] public deposits;
    uint256 public feeAmount;
    uint256 public sellerAmount;

    enum EscrowState {
        unInitialized,
        initialized,
        buyerDeposited,
        serviceApproved,
        escrowComplete,
        escrowCancelled
    }
    EscrowState public escrowState = EscrowState.unInitialized; // unInitialized by default

    mapping(address => uint256) private balances;

    event Deposit(address depositor, uint256 deposited);
    event ServicePayment(uint256 blockNo, uint256 contractBalance);

    constructor(address _escrowOwner, uint256 _escrowID) {
        escrowOwner = _escrowOwner;
        escrowID = _escrowID;
        escrowCharge = 0;
    }

    function initEscrow(
        address _seller,
        address _buyer,
        uint256 _feePercent,
        uint256 _blockNumber
    ) public {
        require((_seller != msg.sender) && (_buyer != msg.sender));
        require(msg.sender == escrowOwner);

        escrowID += 1;
        seller = _seller;
        buyer = _buyer;
        feePercent = _feePercent;
        blockNumber = _blockNumber;
        escrowState = EscrowState.initialized; // initilizes the EscrowState enum

        balances[seller] = 0;
        balances[buyer] = 0;
    }

    function depositToEscrow() public payable {
        require(msg.sender == buyer);
        require(blockNumber > block.number);

        balances[buyer] = balances[buyer] + msg.value;
        deposits.push(msg.value);
        escrowState = EscrowState.buyerDeposited;
        emit Deposit(msg.sender, msg.value);
    }

    function approveEscrow() public {
        if (msg.sender == seller) {
            sellerApproval = true;
        } else if (msg.sender == buyer) {
            buyerApproval = true;
        }
        if (sellerApproval && buyerApproval) {
            escrowState = EscrowState.serviceApproved;
            fee();
            payOutFromEscrow();
            emit ServicePayment(block.number, address(this).balance);
        }
    }

    function fee() private {
        uint256 totalFee = address(this).balance * (feePercent / 100);
        feeAmount = totalFee;
        payable(escrowOwner).transfer(totalFee);
    }

    function payOutFromEscrow() private {
        balances[buyer] = balances[buyer] - address(this).balance;
        balances[seller] = balances[seller] + address(this).balance;
        escrowState = EscrowState.escrowComplete;
        sellerAmount = address(this).balance;
        payable(seller).transfer(address(this).balance);
        // payable(admin).transfer(address(this).balance);
    }
}
