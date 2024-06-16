import React from 'react';
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
`;

const Form = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Messages = ({ messages, selectedFriend, message, setMessage, handleSendMessage }) => (
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
        <TextField
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <Button variant="contained" onClick={handleSendMessage}>Send</Button>
      </Form>
    )}
  </Section>
);

export default Messages;
