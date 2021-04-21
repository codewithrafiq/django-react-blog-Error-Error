import { Container, Grid } from "@material-ui/core";
import React from "react";
import AllPosts from "../components/AllPosts";

const HomePage = () => {
  return (
    <Container>
      <Grid container>
        <Grid item md={8} lg={8} sm={12} xs={12}>
          <AllPosts />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
