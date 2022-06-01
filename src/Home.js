import { useState, useCallback, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import City from "./City";

export default function Home() {
    const [cityWithID, setCityWithID] = useState([]);

    const API_KEY = "15cSWAcH01Gud5S6AuOAOCAFXPOealGj";
    const REQUEST = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=Poznań&language=pl-pl&details=false`;

    const fetchCity = useCallback(async () => {
        const result = await fetch(REQUEST);

        if (result.ok) {
            const response = await (await result).json();
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
    }, []);

    useEffect(() => {
        fetchCity();
    }, []);

    return (
        <View>
            <FlatList
                data={cityWithID}
                keyExtractor={(item) => item.cityKey}
                renderItem={({ item }) => (
                    <City name={`${item.cityName}, ${item.localizedName}`} />
                )}
            />
        </View>
    );
}
