import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

const Section = styled.section`
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  margin-bottom: 10px;
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

const Form = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const FriendsList = ({ friends, handleSelectFriend, handleAddFriend }) => {
  const [friendUsername, setFriendUsername] = useState('');

  return (
    <Section>
      <SubTitle>Friends</SubTitle>
      <List>
        {friends.map((friend, index) => (
          <ListItem key={index} onClick={() => handleSelectFriend(friend)}>
            {friend.username} ({friend.address})
          </ListItem>
        ))}
      </List>
      <Form>
        <TextField
          type="text"
          placeholder="Add friend username"
          value={friendUsername}
          onChange={(e) => setFriendUsername(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleAddFriend(friendUsername)}>Add</Button>
      </Form>
    </Section>
  );
};

export default FriendsList;
