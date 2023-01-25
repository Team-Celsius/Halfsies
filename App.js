import { NativeBaseProvider, VStack, Spacer } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './Components/NavBar';

export default function App() {
  return (
    <NativeBaseProvider>
      <VStack>
      <View>
        <NavBar />
        <Spacer />
        <Text>Open up App.js to start working on your app!</Text>
      </View>
      </VStack>
    </NativeBaseProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
