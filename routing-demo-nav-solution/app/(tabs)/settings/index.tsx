import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { Link } from 'expo-router';

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <Link href={{ pathname: "/settings/alerts", params: { count: 4 }}} asChild>
                <Pressable>
                    <Text style={styles.link}>4 Alerts</Text>
                </Pressable>
            </Link>

            <Link href={{ pathname: "/settings/alerts", params: { count: 2 }}} asChild>
                <Pressable>
                    <Text style={styles.link}>2 Alerts</Text>
                </Pressable>
            </Link>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    link: {
        marginVertical: 4,
        color: '#2f95dc',
        textDecorationLine: 'underline'
    }
});
