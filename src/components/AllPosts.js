import React from "react";
import { useQuery } from "@apollo/client";
import { Typography } from "@material-ui/core";
import gql from "graphql-tag";
import SinglePost from "./SinglePost";
const AllPosts = () => {
  const { loading: postLoding, error: postError, data: postData } = useQuery(
    POSTS_QUERY
  );
  if (postLoding) return <Typography variant="h1">Loding...</Typography>;
  if (postError) return <Typography variant="h1">Error...</Typography>;
  return (
    <>
      {postData?.posts?.map((item, i) => (
        <SinglePost key={i} post={item} />
      ))}
    </>
  );
};

const POSTS_QUERY = gql`
  {
    posts {
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
`;

export default AllPosts;
