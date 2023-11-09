import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { StatusBar } from "react-native";
export default function MainStack(){
    const Stack = createNativeStackNavigator()
    return(
        <Stack.Navigator screenOptions={{headerShown : false , }}>
            <Stack.Screen  name="home" component={Home}  />
            <Stack.Screen name="profile" component={Profile} />
        </Stack.Navigator>
    )
    
}

