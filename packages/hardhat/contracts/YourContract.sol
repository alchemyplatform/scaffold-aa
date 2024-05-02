//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract AlchemyU {
	mapping(address => uint) public balances;

	function mint(uint x) external {
		balances[msg.sender] += x;
	}
}
