import React from 'react';
import {StyleSheet} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import ViewScreen from './Screens/ViewScreen';
import CreateScreen from './Screens/CreateScreen';
import EditScreen from './Screens/EditScreen';


const Stack = createStackNavigator();
export default class App extends Component {
 
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="NeverMiss"
            component={HomeScreen}
            options={styles.HeaderOptionsStyle}
          />
          <Stack.Screen
            name="ViewScreen"
            component={ViewScreen}
            options={styles.HeaderOptionsStyle}
          />
          <Stack.Screen
            name="CreateScreen"
            component={CreateScreen}
            options={styles.HeaderOptionsStyle}
          />  
          <Stack.Screen
            name="EditScreen"
            component={EditScreen}
            options={styles.HeaderOptionsStyle}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  HeaderOptionsStyle: {
    
    headerStyle: {
      backgroundColor: '#D3C1A7',
      
      
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      
   
      
    },
    headerTitleAlign: 'center',
  },
});