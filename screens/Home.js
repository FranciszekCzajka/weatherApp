import {
    StyleSheet,
    SafeAreaView,
    TextInput,
    View,
    Text,
    Button,
    Alert,
} from "react-native";

import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function Home({ navigation }) {
    const [city, setCity] = useState("");
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Enter city</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    onChangeText={setCity}
                />
                <Button
                    title="Press me"
                    onPress={() => {
                        navigation.navigate("CitiesList", {
                            name: city,
                        });
                    }}
                />
            </View>
            <StatusBar hidden={false} translucent={false} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 140,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
    },
});
