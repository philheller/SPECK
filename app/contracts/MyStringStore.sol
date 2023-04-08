// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MyStringStore {
    event StringSet(string _message);
    string myString = "Hello World";

    function set(string memory x) public {
        myString = x;

        emit StringSet(x);
    }

    function getMyString() public view returns (string memory) {
        return myString;
    }
}
