import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import Logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import { signOutUserStart } from "./../../redux/User/user.actions";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumberCartItems: selectCartItemsCount(state),
});

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser, totalNumberCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/cart">
                Your Cart{" "}
                {totalNumberCartItems > 0 &&
                  `(${totalNumberCartItems})`}
              </Link>
            </li>
            {currentUser && [
              <li key="1">
                <Link to="/dashboard">My Account</Link>
              </li>,
              <li key="2">
                <span onClick={() => signOut()}>Log Out</span>
              </li>,
            ]}
            {!currentUser && [
              <li key="1">
                <Link to="/registration">Register</Link>
              </li>,
              <li key="2">
                <Link to="/login">Sign In</Link>
              </li>,
            ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
