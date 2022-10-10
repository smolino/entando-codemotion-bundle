import {useContext, useEffect, useState} from 'react';
import React from 'react';
import logo from './entando.svg';
import './UserUi.css';
import KeycloakContext from './KeycloakContext';
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import {Snackbar} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

const API_USERS_PATH = '/api/users'

function UserUi({ config }) {
  const { systemParams, params } = config || {};
  const { api } = systemParams || {};

  const { headerColor } = params || {};

  const internalApiUrl = api && api['int-api'].url;

  const [users, setUsers] = useState([]);

  const keycloak = useContext(KeycloakContext);
  const [open, setOpen] = React.useState(false);

  const openSuccessMessage = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const fetchUsers = async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${keycloak.token}`
      }
    }
    try {
      const internalApiResponse = await fetch(internalApiUrl + API_USERS_PATH, options)
      if (internalApiResponse.ok) {
        setUsers((await internalApiResponse.json()));
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error)
      setUsers([]);
    }
  };

  const handleFetchUsers = () => {
    if (keycloak.authenticated) {
      if (keycloak.isTokenExpired()) {
        keycloak.login();
      } else {
        fetchUsers();
      }
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handlePostUser = (user) => {
    if (keycloak.authenticated) {
      if (keycloak.isTokenExpired()) {
        keycloak.login();
      } else {
        postUser(user);
      }
    }
  };

  const postUser = async (user) => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    };
    try {
      const internalApiResponse = await fetch(internalApiUrl + API_USERS_PATH, options);

      if (internalApiResponse.ok) {
        handleFetchUsers();
        openSuccessMessage();
      } else {
        console.log(`Error status ${internalApiResponse.status}`);
      }
    } catch (error) {
      setUsers(error.message);
    }
  };

  const handleLogoutClick = () => {
    keycloak.logout();
  }

  useEffect(() => {
    console.log(`useEffect ${keycloak.authenticated}`);
    handleFetchUsers();
  }, [keycloak.authenticated]);

  return (
    <div className="App">
      <header className={`App-header-${headerColor} App-header`} >
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <br/>
      <div> { keycloak.authenticated && (
            <>
              {
                process.env.NODE_ENV === 'development' && (
                  <button onClick={handleLogoutClick}>Log out</button>
                )
              }
              <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='success'>
                  User Created!
                </Alert>
              </Snackbar>
              <UserForm onSubmit={handlePostUser}/>
              <h2>Users</h2>
              <UserTable items={users.reverse()} />
            </>)}
      </div>
    </div>
  );
};

export default UserUi;
