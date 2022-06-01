import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Home from "./src/Home";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Home />
                <StatusBar hidden={false} translucent={false} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
