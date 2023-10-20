import { Pressable, StyleSheet, useColorScheme } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Link } from 'expo-router';

import Colors from '../../constants/Colors';

export default function TabOneScreen() {
  const colorScheme = useColorScheme()

  const { tint, text } = Colors[colorScheme ?? 'light']

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text style={styles.subtitle}>@expo-router</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/app/(tabs)/index.tsx" />

      <Link href="/other" asChild style={[styles.button, { backgroundColor: tint, borderColor: tint }]}>
        <Pressable>
          <Text style={{ color: text }} >Other</Text>
        </Pressable>
      </Link>
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
  subtitle: {
    fontSize: 16,
    fontWeight: "100",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 30
  },
});
