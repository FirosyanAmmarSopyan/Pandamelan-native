import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./Navigator/MainTab";
import { NativeBaseProvider } from "native-base";
export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MainTab />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
