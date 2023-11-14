import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./navigator/MainTab";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { NativeBaseProvider } from "native-base";

const client = new ApolloClient({
  uri: "https://6bec-36-68-222-33.ngrok-free.app/",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <NativeBaseProvider>
          <MainTab />
        </NativeBaseProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
