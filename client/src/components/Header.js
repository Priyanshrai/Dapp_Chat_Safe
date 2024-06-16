import React from 'react';
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

const HeaderContainer = styled(AppBar)`
  background-color: #3f51b5;
  margin-bottom: 20px;
`;

const Title = styled(Typography)`
  flex-grow: 1;
  font-size: 24px;
  font-weight: bold;
`;

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled(Typography)`
  margin-right: 10px;
  font-weight: bold;
`;

const Header = ({ account, username }) => {
  return (
    <HeaderContainer position="static">
      <Toolbar>
        <Title variant="h6">Chat Safe</Title>
        <AccountInfo>
          <Username variant="body1">{username}</Username>
          <IconButton color="inherit">
            <Avatar alt={username} />
          </IconButton>
          <Typography variant="body2">{account}</Typography>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </AccountInfo>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;
