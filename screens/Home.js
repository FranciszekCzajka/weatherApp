import {
    StyleSheet,
    SafeAreaView,
    TextInput,
    View,
    Text,
    Button,
    FlatList,
} from "react-native";

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import CityDetails from "./CityDetails";
import City from "../src/City";

export default function Home({ navigation }) {
    const [city, setCity] = useState([]);
    const [cityWithID, setCityWithID] = useState([]);
    const API_KEY = "ocFtNKypsNiEXW9IMkofjF1dby1hrGLd";
    const REQUEST = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}&language=pl-pl&details=false`;

    async function requestCities() {
        const result = await fetch(REQUEST);

        if (result.ok) {
            const response = await result.json();
            const cities = [];
            response.map((city) => {
                const cityToAdd = {
                    cityName: city.LocalizedName,
                    localizedName: city.AdministrativeArea.LocalizedName,
                    cityKey: city.Key,
                };
                cities.push(cityToAdd);
            });
            setCityWithID(cities);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Enter city</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    onChangeText={setCity}
                />
                <Button title="Press me" onPress={() => requestCities()} />
            </View>
            <FlatList
                data={cityWithID}
                keyExtractor={(item) => item.cityKey}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("CityDetails", {
                                key: item.cityKey,
                                name: item.cityName,
                                location: item.localizedName,
                            });
                        }}
                    >
                        <City
                            name={`${item.cityName}, ${item.localizedName}`}
                        />
                    </TouchableOpacity>
                )}
            ></FlatList>
            <StatusBar hidden={false} translucent={false} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#B2F7EF",
    },
    input: {
        height: 40,
        width: 140,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
    },
});
