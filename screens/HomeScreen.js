import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TextInput, Button, List, Card } from "react-native-paper";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export default function HomeScreen({ navigation }) {
  const [signInEmail, setSignInEmail] = useState();
  const [signInPw, setSignInPw] = useState();
  const [createEmail, setCreateEmail] = useState();
  const [createPw, setCreatePw] = useState();
  const [createUname, setCreateUname] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        console.log("user");
        setUser(user);
      } else {
        console.log("no user");
        setUser(null);
      }
    });
  });

  const signInUser = async () => {
    await signInWithEmailAndPassword(auth, signInEmail, signInPw)
      .then(() => {
        navigation.navigate("Details", auth);
        setSignInEmail("");
        setSignInPw("");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const createUser = async () => {
    await createUserWithEmailAndPassword(auth, createEmail, createPw)
      .then((userCredentials) => {
        console.log(userCredentials);
        updateProfile(auth.currentUser, {
          displayName: createUname,
        });
        setCreateEmail("");
        setCreatePw("");
        setCreateUname("");
        navigation.navigate("Details", auth);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const loggedInOrNot = () => {
    if (auth.currentUser != null) {
      return (
        <View>
          <Text style={styles.subHeader}>
            You are already signed in, view your account.
          </Text>
          <Button
            style={styles.buttons}
            mode={"contained"}
            onPress={() => {
              navigation.navigate("Details", auth);
            }}
          >
            Account Details
          </Button>
        </View>
      );
    } else {
      return (
        <View>
          <Card style={styles.inputsContainer}>
            <Text style={styles.subHeader}>Sign In</Text>
            <TextInput
              style={styles.inputs}
              label={"Email"}
              onChangeText={setSignInEmail}
              value={signInEmail}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.inputs}
              label={"Password"}
              onChangeText={setSignInPw}
              value={signInPw}
            />
            <Button
              style={styles.buttons}
              mode={"contained"}
              onPress={signInUser}
            >
              Sign In
            </Button>
          </Card>
          <Card style={styles.inputsContainer}>
            <Text style={styles.subHeader}>Create an Account</Text>
            <TextInput
              style={styles.inputs}
              label={"Email"}
              onChangeText={setCreateEmail}
              value={createEmail}
            />
            <TextInput
              style={styles.inputs}
              label={"Username"}
              onChangeText={setCreateUname}
              value={createUname}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.inputs}
              label={"Password"}
              onChangeText={setCreatePw}
              value={createPw}
            />
            <Button
              style={styles.buttons}
              mode={"contained"}
              onPress={() => {
                console.log(createEmail == "");
                console.log(createPw == "");
                if (createEmail == "" || createPw == "" || createUname == "") {
                  alert("Please enter an email and password.");
                } else {
                  createUser();
                }
              }}
            >
              Create Account
            </Button>
          </Card>
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.containerWrapper}>
      <View style={styles.container}>
        <Text style={styles.pageHeader}>Welcome!</Text>
        <View>{loggedInOrNot()}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F0B67F",
    borderRadius: 10,
  },
  containerWrapper: {
    backgroundColor: "#353535",
    padding: 10,
  },
  inputsContainer: {
    padding: 10,
    marginBottom: 20,
  },
  pageHeader: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
  },
  inputs: {
    marginBottom: 10,
  },
  buttons: {
    backgroundColor: "#FE5F55",
  },
});
