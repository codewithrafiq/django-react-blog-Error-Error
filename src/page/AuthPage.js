import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

const AuthPage = () => {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [tokenAuth] = useMutation(AUTH_QUERY, {
    onCompleted(data) {
      if (data.tokenAuth.token) {
        console.log("AUTH page,", data.tokenAuth.token);
        window.localStorage.setItem("token", data.tokenAuth.token);
        window.location.href = "/";
      } else {
        alert("Somthing is Wrong!Try Agane...");
      }
    },
  });
  const [createUser, { error: mutationError }] = useMutation(REGISTER_USER, {
    onCompleted(data) {
      console.log("User Register", data);
      if (data.createUser.user.username) {
        alert(
          `User was create for username "${data.createUser.user.username}"`
        );
        setRegister(false);
      } else {
        alert("Somthing is Wrong");
      }
    },
  });
  const loginButton = () => {
    tokenAuth({ variables: { username: username, password: password } });
  };
  const registerUser = () => {
    if (password !== password2) {
      alert("Two Password Not Matched !");
    } else {
      createUser({ variables: { username: username, password: password } });
    }
  };
  if (mutationError) {
    alert("Somthing is Wrong Try Agane");
    window.location.href = "/";
  }
  return (
    <Container>
      <Typography align="center" variant="h2">
        {register ? "Rgister Now" : "Login Now"}
      </Typography>
      <Grid
        spacing={2}
        container
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <Grid item xs={12} md={12} lg={12} sm={12}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12} sm={12}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            name="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        {register && (
          <Grid item xs={12} md={12} lg={12} sm={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              type="password"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Grid>
        )}
        <Box
          style={{
            margin: "0 auto",
          }}
        >
          {register ? (
            <>
              <Button
                onClick={registerUser}
                disabled={!username || !password || !password2}
                color="primary"
                variant="contained"
              >
                Register
              </Button>
              <Button onClick={() => setRegister(false)}>
                Have an Account ? Login Now
              </Button>
            </>
          ) : (
            <>
              <Button
                disabled={!username || !password}
                color="primary"
                variant="contained"
                onClick={loginButton}
              >
                Login
              </Button>
              <Button onClick={() => setRegister(true)}>
                No Account ? Register Now
              </Button>
            </>
          )}
        </Box>
      </Grid>
    </Container>
  );
};
const AUTH_QUERY = gql`
  mutation LoginTodo($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;
const REGISTER_USER = gql`
  mutation Rergister($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user {
        id
        username
        isSuperuser
      }
    }
  }
`;
export default AuthPage;
