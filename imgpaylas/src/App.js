import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { getUser } from "./Datamanager";
import Navigation from "./Navigation";

export default function App() {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  // kullanıcı bilgileri değiştiğinde (giriş/çıkış)
  function onAuthStateChanged(user) {
    setUser(user);
    if (user != null) {
      console.log(
        "User '" + auth().currentUser.displayName + "' logged in successfully."
      );
      getUser(auth().currentUser.uid).update({
        displayName: auth().currentUser.displayName,
      });
    } else {
      console.log("User is null.");
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return <Navigation />;
}
