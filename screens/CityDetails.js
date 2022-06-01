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
    const [isDay, setIsDay] = useState("");
    const [firstAfterTodayTempMin, setFirstAfterTodayTempMin] = useState("");
    const [firstAfterTodayTempMax, setFirstAfterTodayTempMax] = useState("");
    const [secondAfterTodayTempMin, setSecondAfterTodayTempMin] = useState("");
    const [secondAfterTodayTempMax, setSecondAfterTodayTempMax] = useState("");
    const [thirdAfterTodayTempMin, setThirdAfterTodayTempMin] = useState("");
    const [thirdAfterTodayTempMax, setThirdAfterTodayTempMax] = useState("");
    const [fourthAfterTodayTempMin, setFourthAfterTodayTempMin] = useState("");
    const [fourthAfterTodayTempMax, setFourthAfterTodayTempMax] = useState("");
    const [firstDateAfterToday, setFirstDateAfterToday] = useState("");
    const [secondDateAfterToday, setSecondDateAfterToday] = useState("");
    const [thirdDateAfterToday, setThirdDateAfterToday] = useState("");
    const [fourthDateAfterToday, setFourthDateAfterToday] = useState("");

    const { key, name, location } = route.params;

    const API_KEY = "Vu53RS3segVGuuEOrrjOVDX4SAuPsxTI";
    const REQUEST_CURRENT_DATA = `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}&language=pl-pl`;
    const REQUEST_TODAY_DATA = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${API_KEY}&language=pl-pl&details=true&metric=true`;
    const REQUEST_FIVE_DATA = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&language=pl-pl&details=false&metric=true`;

    const fetchCurrentData = useCallback(async () => {
        const result = await fetch(REQUEST_CURRENT_DATA);

        if (result.ok) {
            const response = await result.json();
            setCurrentTemp(response[0].Temperature.Metric.Value);
            setWeatherCondition(response[0].WeatherText);
            setIsDay(response[0].IsDayTime);
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
            const firstDay = response.DailyForecasts[1].Date;
            const firstDayDate = firstDay.split("T");
            setFirstDateAfterToday(firstDayDate[0]);
            const secondDay = response.DailyForecasts[2].Date;
            const secondDayDate = secondDay.split("T");
            setSecondDateAfterToday(secondDayDate[0]);
            const thirdDay = response.DailyForecasts[3].Date;
            const thirdDayDate = firstDay.split("T");
            setThirdDateAfterToday(firstDayDate[0]);
            const fourthDay = response.DailyForecasts[4].Date;
            const fourthDayDate = firstDay.split("T");
            setFourthDateAfterToday(firstDayDate[0]);
        }
    }, []);

    useEffect(() => {
        fetchCurrentData();
        fetchTodayData();
        fetchFiveData();
    }, []);

    return (
        <SafeAreaView
            style={isDay ? styles.backgroundDay : styles.backgroundNight}
        >
            <View style={styles.flex_1}>
                <View style={styles.flexCenter}>
                    <View>
                        <Text style={styles.headline}>
                            {name}, {location}
                        </Text>
                    </View>
                </View>
                <View style={styles.flexCenter}>
                    <Text style={styles.temp}>{currentTemp} C°</Text>
                    <Text style={styles.textNormal}>{weatherCondition}</Text>
                </View>
            </View>
            <View style={[styles.paddingTop_64, styles.flex_1]}>
                <View style={styles.flexDirectionRow}>
                    <View style={[styles.flexCenter, styles.width_50]}>
                        <Text>Najniższa temperatura</Text>
                        <Text>{todayTempMin} C°</Text>
                    </View>
                    <View style={[styles.flexCenter, styles.width_50]}>
                        <Text>Najwyższa temperaura</Text>
                        <Text>{todayTempMax} C°</Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.flexCenter,
                        styles.flexDirectionRow,
                        styles.marginTop_24,
                    ]}
                >
                    <View style={[styles.flexCenter, styles.width_50]}>
                        <Text>Prędkość wiatru</Text>
                        <Text>{windSpeed} km/h</Text>
                    </View>
                    <View style={[styles.flexCenter, styles.width_50]}>
                        <Text>Wschód słońca: {sunRise}</Text>
                        <Text>Zachód słońca: {sunSet}</Text>
                    </View>
                </View>
            </View>
            <View
                style={[
                    styles.flexDirectionRow,
                    styles.width_100,
                    styles.spaceAround,
                    styles.flex_1,
                ]}
            >
                <View>
                    <View
                        style={[
                            styles.margin_8,
                            styles.padding_8,
                            styles.lighterBackground,
                            styles.flexCenter,
                        ]}
                    >
                        <Text>Min. temp: {firstAfterTodayTempMin}</Text>
                        <Text>Max. temp: {firstAfterTodayTempMax}</Text>
                        <Text>{firstDateAfterToday}</Text>
                    </View>
                    <View
                        style={[
                            styles.margin_8,
                            styles.padding_8,
                            styles.lighterBackground,
                            styles.flexCenter,
                        ]}
                    >
                        <Text>Min. temp: {secondAfterTodayTempMin}</Text>
                        <Text>Max. temp: {secondAfterTodayTempMax}</Text>
                        <Text>{secondDateAfterToday}</Text>
                    </View>
                </View>
                <View>
                    <View
                        style={[
                            styles.margin_8,
                            styles.padding_8,
                            styles.lighterBackground,
                            styles.flexCenter,
                        ]}
                    >
                        <Text>Min. temp; {thirdAfterTodayTempMin}</Text>
                        <Text>Max. temp; {thirdAfterTodayTempMax}</Text>
                        <Text>{thirdDateAfterToday}</Text>
                    </View>
                    <View
                        style={[
                            styles.margin_8,
                            styles.padding_8,
                            styles.lighterBackground,
                            styles.flexCenter,
                        ]}
                    >
                        <Text>Min. temp: {fourthAfterTodayTempMin}</Text>
                        <Text>Max. temp: {fourthAfterTodayTempMax}</Text>
                        <Text>{fourthDateAfterToday}</Text>
                    </View>
                </View>
            </View>
            <StatusBar hidden={false} translucent={false} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    backgroundNight: {
        flex: 1,
        padding: 16,
        backgroundColor: "#A3CEF1",
    },
    backgroundDay: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F4EEA9",
    },
    flex_1: {
        flex: 1,
    },
    flexCenter: {
        alignItems: "center",
    },
    width_50: {
        width: "50%",
    },
    width_100: {
        width: "100%",
    },
    height_33: {
        height: "33%",
    },
    flexDirectionRow: {
        flexDirection: "row",
    },
    spaceAround: {
        justifyContent: "space-around",
    },
    headline: {
        fontSize: 36,
    },
    textNormal: {
        fontSize: 22,
    },
    temp: {
        marginTop: 16,
        marginBottom: 8,
        fontSize: 64,
    },
    marginTop_24: {
        marginTop: 24,
    },
    paddingTop_64: {
        marginTop: 64,
    },
    margin_16: {
        margin: 16,
    },
    margin_8: {
        margin: 8,
    },
    padding_8: {
        padding: 8,
    },
    lighterBackground: {
        backgroundColor: "#CBE5F6",
        borderRadius: 8,
    },
});
