import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddNewPostPage from "./page/AddNewPostPage";
import AuthPage from "./page/AuthPage";
import EditProfilePage from "./page/EditProfilePage";
import HomePage from "./page/HomePage";
import PostDetails from "./page/PostDetails";
import ProfilePage from "./page/ProfilePage";

const Root = () => {
  const token = window.localStorage.getItem("token");

  return (
    <BrowserRouter>
      {!token ? (
        <>
          <Route exact path="/" component={AuthPage} />
        </>
      ) : (
        <>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/post-:title-:pk" component={PostDetails} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/editprofile" component={EditProfilePage} />
            <Route exact path="/addpost" component={AddNewPostPage} />
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
};

export default Root;
