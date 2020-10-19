import React, { Component } from "react";
import Button from "./../forms/Button";
import { signInWthGoogle } from "./../../firebase/utils";
import "./styles.scss";

class Signin extends Component {

    handleSubmit = async e =>{
        e.preventDefault()
    }

  render() {
    return (
      <div className="login">
        <div className="wrap">
          <h2>Sign In</h2>
        </div>

        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>
            <div className="socialSignIn">
              <div className="row">
                <Button onClick={signInWthGoogle}>Sign In with Google</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signin;
