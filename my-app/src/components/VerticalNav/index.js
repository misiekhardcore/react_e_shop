import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "./../UserProfile";
import "./styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const VerticalNav = ({ children }) => {
  const { currentUser } = useSelector(mapState);

  const currentUserProfile = {
    currentUser,
  };
  return (
    <div className="verticalNav">
      <UserProfile {...currentUserProfile} />
      <div className="menu">{children}</div>
    </div>
  );
};

export default VerticalNav;
