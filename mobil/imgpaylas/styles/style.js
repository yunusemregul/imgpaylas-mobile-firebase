import { StyleSheet } from "react-native";

const colors = {
  primary: "#7D7D7D",
  important: "#FFCC5C",
  negative: "#FF6F69",
  positive: "#88D8B0",
  background: "#F3F4F5",
  white: "#FFFFFF",
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  textinput: {
    marginTop: 14,
    color: colors.primary,
    fontSize: 17,
    borderColor: colors.primary,
    width: 245,
    height: 40,
    borderWidth: 2,
    padding: 10,
    borderRadius: 2,
  },
  loginbutton: {
    padding: 8,
    backgroundColor: colors.primary,
    marginTop: 32,
    width: 245,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    height: 40,
  },
  registerbutton: {
    padding: 8,
    backgroundColor: colors.important,
    marginTop: 14,
    width: 245,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    height: 40,
  },
  tabtitle: {
    fontSize: 33,
    marginLeft: "4%",
    marginTop: 30,
    color: colors.primary
  },
  uploadnewbutton: {
    padding: 8,
    backgroundColor: colors.positive,
    marginTop: 14,
    width: "92%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    height: 40,
    alignSelf: "center"
  }
});

/*



// TODO: style ları ortak bir yerden al
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F5",
    alignItems: "center",
    justifyContent: "center",
  },
  textinput: {
    marginTop: 14,
    color: colors.primary,
    fontSize: 17,
    borderColor: colors.primary,
    width: 245,
    height: 40,
    borderWidth: 2,
    padding: 10,
    borderRadius: 2,
  },
  loginbutton: {
    padding: 8,
    backgroundColor: colors.primary,
    marginTop: 32,
    width: 245,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    height: 40,
  },
  registerbutton: {
    padding: 8,
    backgroundColor: colors.important,
    marginTop: 14,
    width: 245,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    height: 40,
  },
});

*/
