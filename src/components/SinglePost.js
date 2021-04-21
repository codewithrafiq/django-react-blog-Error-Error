import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";
import SingleComment from "./SingleComment";
import { useHistory } from "react-router";
import { Image } from "@material-ui/icons";

const SinglePost = ({ post, showFull = false }) => {
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();
  const expandedmore = () => {
    setExpanded(!expanded);
  };
  const goPostDetailsPage = () => {
    history.push(`/post-${post?.title}-${post?.id}`);
  };
  return (
    <Card
      style={{
        margin: "20px 0",
      }}
    >
      {/* {console.log(post)} */}
      <CardHeader
        avatar={
          <Avatar
            style={{
              cursor: "pointer",
            }}
            src={post?.profile?.image}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.profile?.user?.username}
        subheader={moment(post?.date).format("MMMM Do YYYY")}
      />
      <CardActionArea onClick={goPostDetailsPage}>
        <CardMedia
          style={{
            height: "400px",
            width: "auto",
          }}
          image={post?.image}
          title="Paella dish"
        />
      </CardActionArea>
      <CardContent>
        <CardActionArea onClick={goPostDetailsPage}>
          <Typography gutterBottom variant="h5" component="h2">
            {post?.title}
          </Typography>
        </CardActionArea>
        <Typography variant="body2" color="textSecondary" component="p">
          {showFull ? (
            post?.content
          ) : (
            <>
              {post?.content?.length >= 200 &&
                `${post?.content.substring(0, 200)}....`}
              <Button color="secondary">Read More</Button>
            </>
          )}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          margin: "0 50px",
        }}
      >
        <Button
          endIcon={
            <FavoriteIcon color={post?.mlikes ? "secondary" : "primary"} />
          }
        >
          {post?.tlikes}
        </Button>
        <Button
          style={{
            marginLeft: "auto",
          }}
          endIcon={<CommentIcon />}
          onClick={expandedmore}
        >
          {post?.comments?.length}
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <TextField
          fullWidth
          id="filled-basic"
          label="Filled"
          variant="filled"
          InputProps={{
            endAdornment: (
              <IconButton>
                <SendIcon />
              </IconButton>
            ),
          }}
        />
        <Box>
          {post?.comments?.map((item, i) => (
            <SingleComment key={i} item={item} />
          ))}
        </Box>
      </Collapse>
    </Card>
  );
};

export default SinglePost;
