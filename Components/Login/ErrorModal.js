import { useState } from "react";

export function errorModal(initialModalVisible) {
  const [modalVisible, setModalVisible] = useState(initialModalVisible);
  const [errorText, setErrorText] = useState("");

  const showErrorModal = (errorCode) => {
    setErrorText(errorTextCreator(errorCode));
    setModalVisible(true);
  };

  function errorTextCreator(errorCode) {
    if (errorCode === "auth/invalid-email") {
      return "Email invalid.";
    } else if (errorCode === "auth/user-not-found") {
      return "Sorry, user not found. Please try again";
    } else if (errorCode === "auth/wrong-password") {
      return "Wrong password, please try again.";
    }
  }

  return [modalVisible, errorText, showErrorModal];
}
