import { useSelector } from "react-redux";
import { useEffect } from "react";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = (props) => {
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    if (!currentUser) {
      props.history.push("/login");
    }
  }, [currentUser, props.history]);

  return currentUser;
};

export default useAuth;
