import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import styled from 'styled-components';

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

const AccountForm = ({
  userExists,
  handleCreateAccount,
  handleDeleteAccount,
  handleUpdateUsername,
  handleUpdatePassword,
  openEditModal,
  handleOpenEditModal,
  handleCloseEditModal,
  username,
  setUsername,
  password,
  setPassword,
  newUsername,
  setNewUsername,
  newPassword,
  setNewPassword
}) => (
  <>
    {!userExists ? (
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
    ) : (
      <div>
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
      </div>
    )}
  </>
);

export default AccountForm;
