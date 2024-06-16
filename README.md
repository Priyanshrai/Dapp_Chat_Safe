# Chat Safe

Chat Safe is a secure decentralized chat application built on Ethereum blockchain. It allows users to create accounts, add friends, and send encrypted messages to each other, ensuring privacy and security.

## Features

- **Account Creation**: Users can create accounts with a username and password.
- **Friend Management**: Add friends using their usernames.
- **Messaging**: Send and receive messages with friends securely.
- **Account Management**: Update or delete your account.
- **Username Display**: Usernames are displayed alongside public addresses for better readability.

## Technologies Used

- **Solidity**: Smart contract development.
- **React**: Frontend development.
- **Web3.js**: Interaction with Ethereum blockchain.
- **Truffle**: Development environment for Ethereum.
- **MetaMask**: Ethereum wallet and browser extension.
- **Material-UI**: UI components.

## Getting Started

### Prerequisites

- Node.js
- Truffle
- MetaMask extension in your browser
- Ethereum client (Ganache, Infura, etc.)

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/Priyanshrai/Dapp_Chat_Safe.git
   cd chat-safe
   ```

2. **Install dependencies**

   ```sh
   cd truffle
   npm install
   cd ../client
   npm install
   ```

3. **Compile the smart contracts**

   ```sh
   cd truffle
   truffle compile
   ```

4. **Deploy the smart contracts**

   ```sh
   truffle migrate
   ```

5. **Run the frontend application**

   ```sh
   cd ../client
   npm start
   ```

## Usage

1. **Open MetaMask and connect to your Ethereum network.**
2. **Access the application at `http://localhost:8080`.**
3. **Create your account by entering a username and password.**
4. **Add friends by entering their usernames.**
5. **Select a friend from your friend list and start chatting!**

## Smart Contract

The smart contract handles user account creation, friend management, and messaging. It ensures that messages are securely stored and can only be accessed by the sender and receiver.
ndAddress != address(0), "User not found");


## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss changes.

