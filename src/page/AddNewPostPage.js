import { useMutation } from "@apollo/client";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import gql from "graphql-tag";
import React, { useState } from "react";

const AddNewPostPage = () => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const [addPost] = useMutation(ADD_NEW_POST, {
    onCompleted(data) {
      console.log("add new post data", data);
    },
  });
  const addpost = () => {
    // const data = new FormData();
    // data.append("image", image);
    console.log("image", image);
    // console.log("data", data);
    addPost({
      variables: {
        title: title,
        content: content,
        image: image,
      },
    });
  };
  return (
    <Container>
      <Paper
        style={{
          padding: "15px",
          margin: "20px 0",
        }}
      >
        <Typography align="center" variant="h3">
          Add New Post
        </Typography>
      </Paper>
      <Grid container spacing={3}>
        <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Content"
            onChange={(e) => setContent(e.target.value)}
            // multiline
            rows="4"
            variant="outlined"
          />
        </Grid>
        <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/png,image/jpg"
          />
        </Grid>
        <Button
          disabled={!title}
          onClick={addpost}
          color="primary"
          variant="contained"
        >
          Add Post
        </Button>
      </Grid>
    </Container>
  );
};

const ADD_NEW_POST = gql`
  mutation AddPost($title: String!, $content: String!, $image: Upload!) {
    addPost(title: $title, content: $content, image: $image) {
      post {
        id
        title
        content
        image
      }
    }
  }
`;

export default AddNewPostPage;
