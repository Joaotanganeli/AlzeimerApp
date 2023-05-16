import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Agenda, DateData } from "react-native-calendars";
import { format } from 'date-fns';

const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

type Item = {
    Description: string,
    alarmDate: Date
}

type Post = {
    id: number,
    Description: string,
    alarmDate: Date,
    repeatable: boolean
};

const ScheduleScreen: React.FC = () => {
    const [items, setItems] = useState<{ [key: string]: Post[] }>({});

    useEffect(() => {

        const getData = async () => {
            const response = await fetch(
                'https://ab3a-189-29-145-23.ngrok.io/alarms',
            );

            const data: Post[] = await response.json();

            const mappedData = data.map((post) => {

                const date = new Date(post.alarmDate);

                return {
                    ...post,
                    date: format(date, 'yyyy-MM-dd'),
                }
            });

            // const reduced = mappedData.reduce(
            //     (acc: { [key: string]: Post[] }, currentItem) => {
            //         const { date, ...coolItem } = currentItem;

            //         acc[date] = [coolItem];
            //         console.log(acc);
            //         return acc;
            //     },
            //     {},
            // );

            const reduced = mappedData.reduce((acc, obj) => {
                const { date } = obj;
                if (!acc[date]) {
                    acc[date] = { date, data: [obj] };
                } else {
                    acc[date].data.push(obj);
                }
                return acc;
            }, {});

            const result = Object.values(reduced);
            console.log(result);


            setItems(reduced);
        };
        getData();
    }, []);

    const renderItem = (item: Item) => {
        return (
            <View style={styles.itemContainer}>
                <Text>{item.Description}</Text>
                {/* <Text>{toDateString()}</Text> */}
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safe}>
            <Agenda items={items} renderItem={renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    itemContainer: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});

export default ScheduleScreen;