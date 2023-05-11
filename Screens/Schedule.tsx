import React, { useState } from "react";
import { View, TouchableOpacity, Text } from 'react-native'
import { Agenda, DateData } from "react-native-calendars";
import { Card } from "react-native-paper";

const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

const ScheduleScreen: React.FC = () => {
    const [items, setItems] = useState({});

    const loadItems = (day: DateData) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];

                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                            day: strTime
                        });
                    }
                }
            }

            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    }

    const renderItem = (item) => {
        return (<TouchableOpacity style={{marginRight: 10, marginBottom: 10, marginTop: 10}}>
            <Card>
                <Card.Content>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text>{item.name}</Text>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>)
    }

    return (
        <View style={{ flex: 2 }}>
            <Agenda
                items={{
                    '2023-05-04': [{name: 'item 1 - any js object'}],
                    '2023-05-05': [{name: 'item 2 - any js object', height: 80}],
                    '2023-05-06': [],
                    '2023-05-08': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
                  }}
                loadItemsForMonth={month => {
                console.log('trigger items loading');
                }}
                // loadItemsForMonth={loadItems}
                selected={'2023-05-07'}
                renderItem={renderItem}
            />
        </View>
    )
}

export default ScheduleScreen;