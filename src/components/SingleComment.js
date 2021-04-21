import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React from "react";

const SingleComment = ({ item }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            style={{
              cursor: "pointer",
            }}
            src={item?.profile?.image}
          />
        }
        title={item?.profile?.user?.username}
        subheader={moment(item?.date).format("MMMM Do YYYY")}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {item?.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleComment;
