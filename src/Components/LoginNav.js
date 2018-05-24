import React from "react";
import {loginWithGooglePopUp} from "../utils/auth";

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";
const firebaseUser = "userData";

export default class LoginNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            splashScreen: false
        };

        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    handleGoogleLogin() {
        loginWithGooglePopUp()
            .then((result)=>{
                let token = result.credential.accessToken;
                let user = result.user;
                localStorage.removeItem(firebaseAuthKey);
                localStorage.setItem(appTokenKey, token);
                localStorage.setItem(firebaseUser, JSON.stringify(user));
                window.location.reload();
            })
            .catch(function (error) {
                alert(error); // or show toast
                localStorage.removeItem(firebaseAuthKey);
            });
        localStorage.setItem(firebaseAuthKey, "1");
    }

    render() {
        return <LoginPage handleGoogleLogin={this.handleGoogleLogin}/>;
    }
}

const LoginPage = ({handleGoogleLogin}) => (
    <a onClick={handleGoogleLogin}>
     <span className="fa fa-google"/> Sign in with Google
    </a>
);