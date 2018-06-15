import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg";
import validate from "../../utility/validation";
import { tryAuth, registerUser } from "../../store/actions/index";
import startMainTabs from "../../models/startMainTabs/startMainTabs";
import firebase from 'react-native-firebase';
import ModalDropdown from 'react-native-modal-dropdown';

class AuthScreen extends Component {

  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    authMode: "signup",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      nickname: {
        value: "",
        valid: false,
        validationRules: {
          notEmpty: true
        },
        touched: false
      },
      apartmentName: {
        value: "",
        valid: false,
        validationRules: {
          notEmpty: true
        },
      },
      roomNumber: {
        value: "",
        valid: false,
        validationRules: {
          notEmpty: true
        },
        touched: false
      },
    },
  };


  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillMount(){
      this.setState({
        checkedAuth: false,
      });
  }

  componentDidMount() {
      this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log('hereeeeee',user)
        this.props.onregisterUser(user._user.uid)
        startMainTabs();
      }
      else{
      this.setState({
        checkedAuth: true
      });
    }
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
    this.authSubscription();
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
      nickname: this.state.controls.nickname.value,
      apartmentName: this.state.controls.apartmentName.value,
      roomNumber: this.state.controls.roomNumber.value,
    };
    this.props.onTryAuth(authData, this.state.authMode);
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };



  render() {
    // Auto logIn
    if (!this.state.checkedAuth) {
      return null;
    }
    else if(this.state.user) {
      return null
    };

    let headingText = null;
    let inputUserInfo = null;
    let submitButton = (
      <ButtonWithBackground
        color="#29aaf4"
        onPress={this.authHandler}
        disabled={
          ((
            !this.state.controls.apartmentName.valid ||
            !this.state.controls.roomNumber.valid ||
            !this.state.controls.nickname.valid
          )
            && this.state.authMode === "signup"
          ) ||
          !this.state.controls.email.valid ||
          !this.state.controls.password.valid
        }>
        Submit
    </ButtonWithBackground>
    );

    console.log(this.props.isLoading, 11222222222222222222222)

    if (this.props.isLoading) {
      console.log(11111111111111111111111111111111111111)
      submitButton = <ActivityIndicator />
    }

    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    if (this.state.authMode === "signup") {

      inputUserInfo = (
        <View>
          <DefaultInput
            placeholder="ニックネーム(公開)"
            style={styles.input}
            value={this.state.controls.nickname.value}
            onChangeText={val => this.updateInputState("nickname", val)}
            valid={this.state.controls.nickname.valid}
            touched={this.state.controls.nickname.touched}
          />

          <View style={{
            width: "100%",
            borderWidth: 1,
            borderColor: '#eee',
            padding: 5,
            marginTop: 8,
            marginBottom: 8,
            backgroundColor: 'white'
          }}>
            <ModalDropdown options={['サンスプリングストーン', 'グランツ武蔵新城', '石原マンション', 'マーライオン']}
              defaultValue='マンション名を選択してください'
              keyboardShouldPersistTaps='always' 
              onSelect={(idx, value) =>  this.updateInputState("apartmentName", value)}
              />
          </View>
          <DefaultInput
            placeholder="部屋番号(非公開)"
            style={styles.input}
            value={this.state.controls.roomNumber.value}
            onChangeText={val => this.updateInputState("roomNumber", val)}
            valid={this.state.controls.roomNumber.valid}
            touched={this.state.controls.roomNumber.touched}
            keyboardType="numeric"
          />

        </View>
      );
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <ButtonWithBackground
            color="#29aaf4"
            onPress={this.switchAuthModeHandler}
          >
            Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="メールアドレス"
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={val => this.updateInputState("email", val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <View
                style={
                  this.state.viewMode === "portrait" ||
                    this.state.authMode === "login"
                    ? styles.portraitPasswordContainer
                    : styles.landscapePasswordContainer
                }
              >
                <View
                  style={
                    this.state.viewMode === "portrait" ||
                      this.state.authMode === "login"
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput
                    placeholder="パスワード(6文字以上)"
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={val => this.updateInputState("password", val)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    secureTextEntry
                  />
                </View>
                {/* {confirmPasswordControl} */}
                {inputUserInfo}
              </View>

            </View>
          </TouchableWithoutFeedback>
          {submitButton}
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  }
});


const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onregisterUser: (uid) => dispatch(registerUser(uid)),    
  };
};

mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
// export default AuthScreen;
