import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import SinglePost from "../components/SinglePost";

const PostDetails = () => {
  const { pk } = useParams();
  const ipk = parseInt(pk);
  const { loading, error, data } = useQuery(SINGLE_POSTS_QUERY, {
    variables: { pk: ipk },
  });
  if (loading) return <h1>Loding...</h1>;
  if (error) return <h1>Loding...</h1>;
  return (
    <>
      {/* {console.log(data?.posts[0])} */}
      <SinglePost post={data?.posts[0]} showFull={true} />
    </>
  );
};
const SINGLE_POSTS_QUERY = gql`
  query PostQuery($pk: Int) {
    posts(pk: $pk) {
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
export default PostDetails;
