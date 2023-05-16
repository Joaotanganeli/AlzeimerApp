import { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, Switch, Button, Platform, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import api from '../services/api'
import axios from 'axios';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// Notifications.scheduleNotificationAsync({
//     content: {
//         title: 'aaaaaa',
//     },
//     trigger: {
//         seconds: 5,
//         repeats: false,
//     },
// });

export function Alerts() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleSave = () => {
        const data = {
            Description: text,
            date: date,
            repeatable: isEnabled,
        };

        api.post('alarms', data)
    };


    const getPosts = () => {
        fetch("https://c0df-189-29-145-23.ngrok.io/alarms")
        .then((res) => res.json())
        .then(resJson => {
            console.log(resJson)
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Text Input:</Text>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
            />
            <Text style={styles.label}>Date Picker:</Text>
            <TouchableOpacity onPress={showDatePicker}>
                <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Text style={styles.label}>Boolean Switch:</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}


async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
