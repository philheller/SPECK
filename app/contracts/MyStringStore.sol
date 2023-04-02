pragma solidity 0.8.3;

contract MyStringStore {
    event StringSet(string _message);
    string public myString = "Hello World";

    function set(string memory x) public {
        myString = x;

        emit StringSet(x);
    }
}