import * as React from 'react';
import { Button, View, Text } from 'react-native';


export default function PerfilImage({ navigation }) {
    return (
        <View style={styles.topContainer}>
            <View style={styles.image}>
                <Image
                    source={{
                        uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
                    }}
                    style={styles.image}
                />
            </View>
            <View>
                <Text style={styles.textHeadingStyle}>
                    Quem sou eu?
                </Text>
            </View>
            <View style={styles.clock}>
                <Text style={styles.date}>{date.format("dddd, DD MMMM YYYY")}</Text>
                <Text style={styles.time}>{date.format("hh:mm")}</Text>
            </View>
        </View>
    )
}