import { Box, Text, Container, Switch, Center } from "native-base";
import { StyleSheet, StatusBar, View ,  } from "react-native";
import LottieView from "lottie-react-native";
export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
            justifyContent : "center",
            alignItems : 'center'
          }}
          source={require("../assets/lottie-maintenance.json")}
        />
        <Text style={styles.text}>Halaman Profile Soon!</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    marginVertical : 20
  },
});
