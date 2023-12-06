import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button, Card, Modal, Appbar } from "react-native-paper";
import {
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";

export default function DetailScreen({ navigation, route }) {
  let auth = route.params;
  let user = auth.currentUser;

  const [verifyEnable, setVerifyEnable] = useState(false);
  const [verifyText, setVerifyText] = useState("Verify Email");
  const [errorMsg, setErrorMsg] = useState();
  const [uName, setUName] = useState();
  const [email, setEmail] = useState();
  const [inputUserName, setInputUserName] = useState(
    auth.currentUser.displayName
  );
  const [inputEmail, setInputEmail] = useState(auth.currentUser.email);
  const [inputPw, setInputPw] = useState();
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const signUserOut = async () => {
    await signOut(auth).then(() => {
      navigation.navigate("Home");
    });
  };

  const editAccount = (type) => {
    if (type === "Username") {
      updateProfile(auth.currentUser, {
        displayName: inputUserName,
      })
        .then(() => {
          console.log("Name updated");
          hideModal();
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMsg(error.message);
        });
    } else if (type === "Email") {
      updateEmail(auth.currentUser, inputEmail)
        .then(() => {
          console.log("Email updated");
          hideModal();
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMsg(error.message);
        });
    } else if (type === "Pw") {
      updatePassword(auth.currentUser, inputPw)
        .then(() => {
          console.log("Pw updated");
          hideModal();
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMsg(error.message);
        });
    }
  };

  const verify = () => {
    sendEmailVerification(user)
      .then(() => {
        console.log("sent");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    setUName(user.displayName);
    setEmail(user.email);
    if (user.emailVerified === true) {
      setVerifyText("Email Verified!");
      setVerifyEnable(true);
    }
  });

  return (
    <View style={styles.container1}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={"Your Account"} />
        <Appbar.Action icon="account-edit" onPress={showModal} />
        <Appbar.Action icon="logout" onPress={signUserOut} />
      </Appbar.Header>

      <View style={styles.container2}>
        <Card style={styles.displayCard}>
          <Text style={styles.infoText}>
            <Text style={{ fontWeight: "bold" }}>Email: </Text>
            {email}
          </Text>
        </Card>
        <Card style={styles.displayCard}>
          <Text style={styles.infoText}>
            <Text style={{ fontWeight: "bold" }}>Display Name: </Text>
            {uName}
          </Text>
        </Card>
        <Button
          style={styles.displayCard}
          disabled={verifyEnable}
          textColor="#000"
          icon="check-all"
          onPress={verify}
        >
          {verifyText}
        </Button>

        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalStyle}
        >
          <Text style={styles.subHeader}>Edit Account</Text>
          <Text style={styles.errorText}>{errorMsg}</Text>
          <TextInput
            placeholder={inputUserName}
            label="Username"
            onChangeText={setInputUserName}
            style={styles.input}
          />
          <Button
            style={styles.buttons}
            mode={"contained"}
            onPress={() => {
              editAccount("Username");
            }}
          >
            Update Username
          </Button>
          <TextInput
            placeholder={inputEmail}
            label="Email"
            onChangeText={setInputEmail}
            style={styles.input}
          />
          <Button
            style={styles.buttons}
            mode={"contained"}
            onPress={() => {
              editAccount("Email");
            }}
          >
            Update Email
          </Button>
          <TextInput
            label="Password"
            onChangeText={setInputPw}
            style={styles.input}
          />
          <Button
            style={styles.buttons}
            mode={"contained"}
            onPress={() => {
              editAccount("Pw");
            }}
          >
            Update Password
          </Button>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    padding: 0,
  },
  container2: {
    flex: 1,
    backgroundColor: "#353535",
  },
  header: {
    backgroundColor: "#F0B67F",
    height: 75,
  },
  subHeader: {
    fontSize: 20,
    textAlign: "center",
  },
  errorText: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
  },
  infoText: {
    fontSize: 17,
  },
  buttons: {
    backgroundColor: "#000",
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 7,
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
    borderBottomColor: "#000",
  },
  modalStyle: {
    backgroundColor: "#F0B67F",
    padding: 20,
  },
  displayCard: {
    padding: 20,
    backgroundColor: "#FE5F55",
    marginTop: 7,
    marginRight: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    textAlign: "left",
  },
});
