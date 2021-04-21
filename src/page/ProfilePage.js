import { useQuery } from "@apollo/client";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import gql from "graphql-tag";
import React from "react";
import { Link } from "react-router-dom";
import SinglePost from "../components/SinglePost";

const useStyle = makeStyles((theme) => ({
  profileDataContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  avatorStyle: {
    display: "block",
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const ProfilePage = () => {
  const classes = useStyle();
  const { loading, error, data } = useQuery(PROFILE_QUERY);
  if (loading) return <CircularProgress />;
  if (error) return <CircularProgress color="secondary" />;
  return (
    <Container>
      {console.log(data)}
      <Paper
        style={{
          padding: "15px 0",
        }}
        className={classes.profileDataContainer}
      >
        <Avatar className={classes.avatorStyle} src={data?.profile?.image} />
        <Typography>{data?.profile?.bio}</Typography>
        <Typography component="h5" variant="h5">
          {data?.profile?.name}
        </Typography>
        <Typography variant="subtitle2">
          @{data?.profile?.user?.username}
        </Typography>
        <Button
          component={Link}
          to="/editprofile"
          color="secondary"
          variant="outlined"
        >
          Edit
        </Button>
      </Paper>
      <Paper
        style={{
          margin: "20px 0",
        }}
      >
        <Typography align="center" variant="h4">
          My Posts
        </Typography>
      </Paper>
      {data?.profile?.postSet?.map((item, i) => (
        <SinglePost post={item} key={i} />
      ))}
    </Container>
  );
};

const PROFILE_QUERY = gql`
  {
    profile {
      id
      name
      bio
      image
      user {
        id
        username
        email
      }
      postSet {
        id
        title
        date
        image
        content
        tlikes
        mlikes
        comments {
          id
          title
          profile {
            image
            user {
              username
            }
          }
        }
        profile {
          image
          user {
            username
          }
        }
      }
    }
  }
`;

export default ProfilePage;
