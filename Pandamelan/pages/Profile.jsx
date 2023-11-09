import { Box, Text, Container , Switch , Center } from "native-base";
import { StyleSheet , StatusBar } from "react-native";
export default function Profile() {
  return (
        <Box style={styles.AndroidSafeArea}>
          <Text>Ini Profile</Text>
        </Box>
  );
}
const styles = StyleSheet.create({
  AndroidSafeArea: {
      padding: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})
