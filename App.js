import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'react-native';

import Details from './src/pages/Details';
import NewTask from './src/pages/NewTask';
import Task from './src/pages/Task';

const Stack = createNativeStackNavigator();

//#FFFFFF
//<StatusBar backgroundColor="#100F12" color="#" barStyle="dark-content"  />
//PAGINA DEFAULT  initialRouteName="Task"

//propriedade 
//screenOptions={{ headerStyle: { backgroundColor: '#100F12' } }}
export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Task">
        <Stack.Screen 
          name="Task"
          component={Task}
          options={styles.optionsCustomStackScreen}
        />
        <Stack.Screen name="NewTask" component={NewTask} options={styles.optionsCustomStackScreen} />
        <Stack.Screen name="Details" component={Details} options={styles.optionsCustomStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgrounHeader: {
    backgroundColor: '#100F12'
  },
  optionsCustomStackScreen: {
    headerTintColor: "#0EFFF7",
    headerTitleStyle: {
      fontWeight: 'bold', //Set Header text style
    },
    headerStyle: {
      backgroundColor: "#100F12",
      //height: 40,
      //elevation: 25,
      // elevation: 0,
      // shadowOpacity: 0,
      // borderBottomWidth: 0,
      borderBottomColor: 'yellow',
      borderBottomWidth: 5,
    },
    headerShadowVisible: true,
    statusBarColor: "#100F12",
  }
});