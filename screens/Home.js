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
    const API_KEY = "Vu53RS3segVGuuEOrrjOVDX4SAuPsxTI";
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
                <Text style={styles.headline}>Wpisz miasto</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    onChangeText={setCity}
                />
                <Button
                    color="#E5625E"
                    title="WYSZUKAJ MIASTO"
                    onPress={() => requestCities()}
                />
            </View>
            <FlatList
                style={styles.list}
                data={cityWithID}
                keyExtractor={(item) => item.cityKey}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.listElements}
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#A3CEF1",
    },
    headline: {
        fontSize: 32,
    },
    input: {
        height: 40,
        marginVertical: 12,
        padding: 10,
        backgroundColor: "#BADCF3",
        borderRadius: 8,
    },
    list: {
        marginVertical: 12,
    },
    listElements: {
        backgroundColor: "#BADCF3",
        marginVertical: 6,
        padding: 12,
        borderRadius: 8,
    },
});
