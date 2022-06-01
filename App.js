import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import CitiesList from "./screens/CitiesList";
import CityDetails from "./screens/CityDetails";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CitiesList" component={CitiesList} />
                <Stack.Screen name="CityDetails" component={CityDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
