import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
var firebaseConfig = {
  apiKey: "AIzaSyBu4sUHi4Wpbu8D8ksIQ-NsnlHr73Eb6HI",
  authDomain: "my-app-4ca53.firebaseapp.com",
  projectId: "my-app-4ca53",
  storageBucket: "my-app-4ca53.appspot.com",
  messagingSenderId: "560632768202",
  appId: "1:560632768202:web:b72ccaa3d7a4f221183633"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

const appIcon = require("../assets/9.jpg");
const rBG_image = require("../assets/8.jpg");

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      fontsLoaded: false,
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  registerUser = (email, password, confirmPassword, first_name, last_name) => {
     const auth = getAuth();
    if (password == confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          Alert.alert("User registered!!");
          console.log(userCredential.user.uid);
          this.props.navigation.replace("LoginScreen");
        const db = getDatabase();
        console.log(db)
        set(ref(db, "users/" + userCredential.user.uid), {
 email: userCredential.user.email,
              first_name: first_name,
              last_name: last_name,
              current_theme: "dark",
  })
        })
     .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
        });

    }
  }


  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      const { email, password, confirmPassword, first_name, last_name } =
        this.state;

      return (
        <View style={styles.container}>
          <ImageBackground source={icon} style={styles.Natarajar}>
            <SafeAreaView style={styles.droidSafeArea} />

            <Text style={styles.appTitleText}>Register</Text>

            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ first_name: text })}
              placeholder={"First name"}
              placeholderTextColor={"#FFFFFF"}
            />
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ last_name: text })}
              placeholder={"Last name"}
              placeholderTextColor={"#FFFFFF"}
            />
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ email: text })}
              placeholder={"Enter Email"}
              placeholderTextColor={"#FFFFFF"}
            />
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder={"Enter Password"}
              placeholderTextColor={"#FFFFFF"}
              secureTextEntry
            />
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ confirmPassword: text })}
              placeholder={"Re-enter Password"}
              placeholderTextColor={"#FFFFFF"}
              secureTextEntry
            />
            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={() =>
                this.registerUser(
                  email,
                  password,
                  confirmPassword,
                  first_name,
                  last_name
                )
              }
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.replace("LoginScreen")}
            >
              <Text style={styles.buttonTextNewUser}>Login</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
    alignItems: "center",
    justifyContent: "center",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "",
    height: 800,
    width: 360,
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: "contain",
    marginBottom: RFValue(20),
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    marginBottom: RFValue(20),
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(40),
    padding: RFValue(10),
    marginTop: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(15),
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    marginLeft: 40,
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom: RFValue(20),
    marginLeft: 40,
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
  },
  buttonTextNewUser: {
    fontSize: RFValue(15),
    color: "#FFFFFF",
    marginLeft: 150,
    paddingLeft: 11,
    width: RFValue(60),
    height: RFValue(20),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(10),
    backgroundColor: "black",
    marginBottom: RFValue(20),
  },
});
