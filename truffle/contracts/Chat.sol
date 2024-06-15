// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Chat {
    struct User {
        string username;
        address userAddress;
        bytes32 passwordHash;
    }

    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }

    mapping(address => User) public users;
    mapping(string => address) public usernames;
    mapping(address => address[]) public friends;
    mapping(address => mapping(address => Message[])) public messages;

    event AccountCreated(address userAddress, string username);
    event AccountDeleted(address userAddress);
    event FriendAdded(address userAddress, address friendAddress);
    event MessageSent(address from, address to, string message);
    event UsernameUpdated(address userAddress, string newUsername);
    event PasswordUpdated(address userAddress);

    function createAccount(string memory _username, string memory _password) public {
        require(bytes(users[msg.sender].username).length == 0, "Account already exists");
        require(usernames[_username] == address(0), "Username already taken");

        users[msg.sender] = User({
            username: _username,
            userAddress: msg.sender,
            passwordHash: keccak256(abi.encodePacked(_password))
        });
        usernames[_username] = msg.sender;

        emit AccountCreated(msg.sender, _username);
    }

    function deleteAccount(string memory _username) public {
        require(usernames[_username] == msg.sender, "Unauthorized");

        // Remove messages
        address[] memory userFriends = friends[msg.sender];
        for (uint i = 0; i < userFriends.length; i++) {
            address friend = userFriends[i];
            delete messages[msg.sender][friend];
            delete messages[friend][msg.sender];
        }

        // Remove from friends list
        for (uint i = 0; i < userFriends.length; i++) {
            address friend = userFriends[i];
            address[] storage friendList = friends[friend];
            for (uint j = 0; j < friendList.length; j++) {
                if (friendList[j] == msg.sender) {
                    friendList[j] = friendList[friendList.length - 1];
                    friendList.pop();
                    break;
                }
            }
        }

        // Remove user details
        delete usernames[users[msg.sender].username];
        delete users[msg.sender];
        delete friends[msg.sender];

        emit AccountDeleted(msg.sender);
    }

    function updateUsername(string memory _newUsername) public {
        require(bytes(users[msg.sender].username).length != 0, "Account does not exist");
        require(usernames[_newUsername] == address(0), "Username already taken");

        string memory oldUsername = users[msg.sender].username;
        usernames[_newUsername] = msg.sender;
        delete usernames[oldUsername];

        users[msg.sender].username = _newUsername;

        emit UsernameUpdated(msg.sender, _newUsername);
    }

    function updatePassword(string memory _newPassword) public {
        require(bytes(users[msg.sender].username).length != 0, "Account does not exist");

        users[msg.sender].passwordHash = keccak256(abi.encodePacked(_newPassword));

        emit PasswordUpdated(msg.sender);
    }

    function addFriend(string memory _friendUsername) public {
        address friendAddress = usernames[_friendUsername];
        require(friendAddress != address(0), "User not found");
        require(friendAddress != msg.sender, "You cannot add yourself as a friend");

        friends[msg.sender].push(friendAddress);
        friends[friendAddress].push(msg.sender); // Add reciprocal friend relationship

        emit FriendAdded(msg.sender, friendAddress);
        emit FriendAdded(friendAddress, msg.sender); // Emit event for both users
    }

    function sendMessage(string memory _friendUsername, string memory _message) public {
        address friendAddress = usernames[_friendUsername];
        require(friendAddress != address(0), "User not found");

        messages[msg.sender][friendAddress].push(Message({
            sender: msg.sender,
            content: _message,
            timestamp: block.timestamp
        }));

        messages[friendAddress][msg.sender].push(Message({
            sender: msg.sender,
            content: _message,
            timestamp: block.timestamp
        }));

        emit MessageSent(msg.sender, friendAddress, _message);
    }

    function getFriends() public view returns (address[] memory) {
        return friends[msg.sender];
    }

    function getMessages(string memory _friendUsername) public view returns (Message[] memory) {
        address friendAddress = usernames[_friendUsername];
        require(friendAddress != address(0), "User not found");

        return messages[msg.sender][friendAddress];
    }
}
