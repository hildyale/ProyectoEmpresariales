import React from "react";
import {loginWithGooglePopUp} from "../Services/auth";

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
                let errorCode = error.code;
                let errorMessage = error.message;
                let email = error.email;
                let credential = error.credential;
                console.log('Error')
                console.log('code: '+errorCode)
                console.log('Message: '+errorMessage)
                console.log('email: '+email)
                console.log('credential: '+credential)
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
        <button className="btn">
            <span className="fa fa-google"/> Sign in with Google
        </button>
    </a>
);
