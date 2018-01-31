pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Transaction.sol";

contract TestTransaction {
  Transaction transaction = Transaction(DeployedAddresses.Transaction());
  // Testing the buy() function
  function testUserCanBuyItem() public {
  uint returnedId = transaction.buy(8);

  uint expected = 8;

  Assert.equal(returnedId, expected, "Purchase of itemID 8 should be recorded.");
}
// Testing retrieval of a single items owner
function testGetBuyerAddressByItemId() public {

  // Expected owner is this contract
  address expected = this;

  address buyer = transaction.buyers(8);

  Assert.equal(buyer, expected, "Owner of  itemID 8 should be recorded.");
}

    // Testing retrieval of all pet owners
function testGetBuyerAddressByItemIdInArray() public {

  // Expected owner is this contract
  address expected = this;

  // Store buyers in memory rather than contract's storage
  address[16] memory buyers = transaction.getBuyers();

  Assert.equal(buyers[8], expected, "Owner of itemID 8 should be recorded.");
    }
}