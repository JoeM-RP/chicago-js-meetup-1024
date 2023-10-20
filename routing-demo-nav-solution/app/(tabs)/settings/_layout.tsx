import { Stack } from 'expo-router/stack';

export default function Layout() {
    return <Stack screenOptions={{ headerShown: true, headerTitle: 'Settings' }} />;
}