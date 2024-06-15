import React, { useContext, useState, useEffect } from 'react';
import { BlockchainContext } from '../contexts/BlockchainContext';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  margin-bottom: 10px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled(TextField)`
  && {
    margin-bottom: 10px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Chat = () => {
  const { account, chatContract } = useContext(BlockchainContext);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [accountHolderUsername, setAccountHolderUsername] = useState('');

  useEffect(() => {
    const loadFriends = async () => {
      if (chatContract) {
        try {
          const friendList = await chatContract.methods.getFriends().call({ from: account });
          const friendsWithUsernames = await Promise.all(
            friendList.map(async (friendAddress) => {
              const friend = await chatContract.methods.users(friendAddress).call();
              return { address: friendAddress, username: friend.username };
            })
          );
          setFriends(friendsWithUsernames);
        } catch (error) {
          console.error('Error loading friends:', error);
        }
      }
    };

    const checkUserExists = async () => {
      if (chatContract) {
        try {
          const user = await chatContract.methods.users(account).call();
          setUserExists(user.username !== '');
          setAccountHolderUsername(user.username);
        } catch (error) {
          console.error('Error checking user existence:', error);
        }
      }
    };

    loadFriends();
    checkUserExists();
  }, [chatContract, account]);

  const handleAddFriend = async (friendUsername) => {
    if (chatContract) {
      try {
        await chatContract.methods.addFriend(friendUsername).send({ from: account });
        const friendAddress = await chatContract.methods.usernames(friendUsername).call();
        setFriends([...friends, { address: friendAddress, username: friendUsername }]);
      } catch (error) {
        console.error('Error adding friend:', error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (chatContract && selectedFriend) {
      try {
        await chatContract.methods.sendMessage(selectedFriend.username, message).send({ from: account });
        setMessages([...messages, { sender: account, senderUsername: accountHolderUsername, content: message, timestamp: Math.floor(Date.now() / 1000) }]);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleSelectFriend = async (friend) => {
    if (chatContract) {
      try {
        const msgs = await chatContract.methods.getMessages(friend.username).call({ from: account });
        const messagesWithSenderUsernames = await Promise.all(
          msgs.map(async (msg) => {
            const sender = await chatContract.methods.users(msg.sender).call();
            return { ...msg, senderUsername: sender.username };
          })
        );
        setMessages(messagesWithSenderUsernames);
        setSelectedFriend(friend);
      } catch (error) {
        console.error('Error selecting friend:', error);
      }
    }
  };

  const handleCreateAccount = async () => {
    if (chatContract) {
      try {
        await chatContract.methods.createAccount(username, password).send({ from: account });
        setUserExists(true);
        setAccountHolderUsername(username);
        console.log('Account created successfully');
      } catch (error) {
        console.error('Error creating account:', error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (chatContract) {
      try {
        await chatContract.methods.deleteAccount(username).send({ from: account });
        setUserExists(false);
        setAccountHolderUsername('');
        console.log('Account deleted successfully');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  const handleUpdateUsername = async () => {
    if (chatContract) {
      try {
        await chatContract.methods.updateUsername(newUsername).send({ from: account });
        setAccountHolderUsername(newUsername);
        console.log('Username updated successfully');
      } catch (error) {
        console.error('Error updating username:', error);
      }
    }
  };

  const handleUpdatePassword = async () => {
    if (chatContract) {
      try {
        await chatContract.methods.updatePassword(newPassword).send({ from: account });
        console.log('Password updated successfully');
      } catch (error) {
        console.error('Error updating password:', error);
      }
    }
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <Container>
      <Header>
        <Title>Chat Application</Title>
        <AccountInfo>
          <div>{accountHolderUsername}</div>
          <div>{account}</div>
        </AccountInfo>
      </Header>
      <Section>
        {!userExists && (
          <Form>
            <Input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={handleCreateAccount}>Create Account</Button>
          </Form>
        )}
        {userExists && (
          <Section>
            <SubTitle>Update Account</SubTitle>
            <Button variant="contained" onClick={handleOpenEditModal}>Edit Account</Button>
            <Dialog open={openEditModal} onClose={handleCloseEditModal}>
              <DialogTitle>Edit Account</DialogTitle>
              <DialogContent>
                <Input
                  margin="dense"
                  label="New Username"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <Input
                  margin="dense"
                  label="New Password"
                  type="password"
                  fullWidth
                  variant="standard"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEditModal}>Cancel</Button>
                <Button onClick={() => { handleUpdateUsername(); handleUpdatePassword(); handleCloseEditModal(); }}>Save</Button>
              </DialogActions>
            </Dialog>
            <Button variant="contained" color="error" onClick={handleDeleteAccount}>Delete Account</Button>
          </Section>
        )}
      </Section>
      <Section>
        <SubTitle>Friends</SubTitle>
        <List>
          {friends.map((friend, index) => (
            <ListItem key={index} onClick={() => handleSelectFriend(friend)}>
              {friend.username} ({friend.address})
            </ListItem>
          ))}
        </List>
        <Input
          type="text"
          placeholder="Add friend username"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleAddFriend(e.target.value);
          }}
        />
      </Section>
      <Section>
        <SubTitle>Messages</SubTitle>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <strong>{msg.senderUsername} ({msg.sender})</strong>: {msg.content} <em>{new Date(msg.timestamp * 1000).toLocaleString()}</em>
            </ListItem>
          ))}
        </List>
        {selectedFriend && (
          <Form>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
            />
            <Button variant="contained" onClick={handleSendMessage}>Send</Button>
          </Form>
        )}
      </Section>
    </Container>
  );
};

export default Chat;
