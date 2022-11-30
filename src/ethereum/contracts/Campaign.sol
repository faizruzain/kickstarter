// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.17;

contract CampaignDeployer {
    address[] deployedCampaigns;

    function deployCampaign(uint _minimum) public {
        address newCampaign = address(new Campaign(_minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaign() public view returns(address[] memory deployed) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalsCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimunContribution;
    mapping(address => bool) public approvers;
    mapping(uint => Request) public requests;
    uint public contractBalance;
    uint public approversCount;

    uint public index; // for tracking how many requests this contract has

    constructor(uint minimum, address creator) { //minimum in wei
        manager = creator; //is address who send transaction
        minimunContribution  = minimum;
    }

    function contribute() public payable _minimum {
        approvers[msg.sender] = true;
        contractBalance = address(this).balance;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public onlyContributor {
        Request storage newRequest = requests[index];
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalsCount = 0;
        index++;

        // "buat beli kabel", 22, 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2     
    }

    function approveRequest(uint _index) public {
        Request storage request = requests[_index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }

    function finalizeRequest(uint _index) public {
        require(msg.sender == manager );
        Request storage request = requests[_index];
        require(request.approvalsCount > (approversCount / 2));
        require(!request.complete);
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint _contractBalance,
        uint _minimunContribution,
        uint _approversCount,
        uint _index,
        address _manager
        ) {
        return (
            contractBalance,
            minimunContribution,
            approversCount,
            index,
            manager
        );
    }

    modifier onlyContributor() {
        require(approvers[msg.sender]);
        _;
    }

    modifier _minimum() {
        require(msg.value >= minimunContribution); //msg.value is the amount of wei that the sender send
        _;
    }
}