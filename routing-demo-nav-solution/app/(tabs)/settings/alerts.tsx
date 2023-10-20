import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { Link, router, useLocalSearchParams } from 'expo-router';

export default function AlertsScreen() {
    const params = useLocalSearchParams()
    const { count } = params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alerts: { count || 0}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


            <Link href="/other" asChild>
                <Pressable>
                <Text>Other</Text>
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
});
