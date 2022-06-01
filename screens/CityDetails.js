import { useState, useEffect, useCallback } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function CityDetails({ route }) {
    const [currentTemp, setCurrentTemp] = useState("");
    const [weatherCondition, setWeatherCondition] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [todayTempMin, setTodayTempMin] = useState("");
    const [todayTempMax, setTodayTempMax] = useState("");
    const [sunRise, setSunRise] = useState("");
    const [sunSet, setSunSet] = useState("");
    const [firstAfterTodayTempMin, setFirstAfterTodayTempMin] = useState("");
    const [firstAfterTodayTempMax, setFirstAfterTodayTempMax] = useState("");
    const [secondAfterTodayTempMin, setSecondAfterTodayTempMin] = useState("");
    const [secondAfterTodayTempMax, setSecondAfterTodayTempMax] = useState("");
    const [thirdAfterTodayTempMin, setThirdAfterTodayTempMin] = useState("");
    const [thirdAfterTodayTempMax, setThirdAfterTodayTempMax] = useState("");
    const [fourthAfterTodayTempMin, setFourthAfterTodayTempMin] = useState("");
    const [fourthAfterTodayTempMax, setFourthAfterTodayTempMax] = useState("");

    const { key, name, location } = route.params;

    const API_KEY = "ocFtNKypsNiEXW9IMkofjF1dby1hrGLd";
    const REQUEST_CURRENT_DATA = `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}&language=pl-pl`;
    const REQUEST_TODAY_DATA = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${API_KEY}&language=pl-pl&details=true&metric=true`;
    const REQUEST_FIVE_DATA = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&language=pl-pl&details=false&metric=true`;

    const fetchCurrentData = useCallback(async () => {
        const result = await fetch(REQUEST_CURRENT_DATA);

        if (result.ok) {
            const response = await result.json();
            setCurrentTemp(response[0].Temperature.Metric.Value);
            setWeatherCondition(response[0].WeatherText);
        }
    }, []);

    const fetchTodayData = useCallback(async () => {
        const result = await fetch(REQUEST_TODAY_DATA);

        if (result.ok) {
            const response = await result.json();
            setTodayTempMin(
                response.DailyForecasts[0].Temperature.Minimum.Value
            );
            setTodayTempMax(
                response.DailyForecasts[0].Temperature.Maximum.Value
            );
            setWindSpeed(response.DailyForecasts[0].Day.Wind.Speed.Value);
            const sunRise = response.DailyForecasts[0].Sun.Rise;
            const sunSet = response.DailyForecasts[0].Sun.Set;
            const charsRise = sunRise.split("");
            const charsSet = sunSet.split("");
            setSunRise(
                charsRise[11] +
                    charsRise[12] +
                    charsRise[13] +
                    charsRise[14] +
                    charsRise[15]
            );
            setSunSet(
                charsSet[11] +
                    charsSet[12] +
                    charsSet[13] +
                    charsSet[14] +
                    charsSet[15]
            );
        }
    }, []);

    const fetchFiveData = useCallback(async () => {
        const result = await fetch(REQUEST_FIVE_DATA);

        if (result.ok) {
            const response = await result.json();
            setFirstAfterTodayTempMin(
                response.DailyForecasts[1].Temperature.Minimum.Value
            );
            setFirstAfterTodayTempMax(
                response.DailyForecasts[1].Temperature.Maximum.Value
            );
            setSecondAfterTodayTempMin(
                response.DailyForecasts[2].Temperature.Minimum.Value
            );
            setSecondAfterTodayTempMax(
                response.DailyForecasts[2].Temperature.Maximum.Value
            );
            setThirdAfterTodayTempMin(
                response.DailyForecasts[3].Temperature.Minimum.Value
            );
            setThirdAfterTodayTempMax(
                response.DailyForecasts[3].Temperature.Maximum.Value
            );
            setFourthAfterTodayTempMin(
                response.DailyForecasts[4].Temperature.Minimum.Value
            );
            setFourthAfterTodayTempMax(
                response.DailyForecasts[4].Temperature.Maximum.Value
            );
        }
    }, []);

    useEffect(() => {
        fetchCurrentData();
        fetchTodayData();
        fetchFiveData();
    }, []);

    return (
        <SafeAreaView>
            <View stle={styles.flex}>
                <Text>
                    {name}, {location}
                </Text>
            </View>
            <View>
                <Text>
                    {currentTemp}, {weatherCondition}
                </Text>
            </View>
            <View>
                <Text>{windSpeed}</Text>
                <Text>
                    {todayTempMin}, {todayTempMax}
                </Text>
                <Text>
                    {sunRise}, {sunSet}
                </Text>
            </View>
            <View>
                <Text>
                    {firstAfterTodayTempMin}, {firstAfterTodayTempMax}
                </Text>
                <Text>
                    {secondAfterTodayTempMin}, {secondAfterTodayTempMax}
                </Text>
                <Text>
                    {thirdAfterTodayTempMin}, {thirdAfterTodayTempMax}
                </Text>
                <Text>
                    {fourthAfterTodayTempMin}, {fourthAfterTodayTempMax}
                </Text>
            </View>
            <StatusBar hidden={false} translucent={false} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
});
