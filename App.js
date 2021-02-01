import React from 'react'
import {StatusBar, Text, TouchableOpacity, View,Image} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from './src/screens/Home';
import { Detail } from './src/screens/Detail';
import { Review } from './src/screens/Review';

import {FontAwesome5} from '@expo/vector-icons'

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const ReviewStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const HomeStackNavigator = ({navigation}) =>(
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} options={{headerStyle:{shadowOpacity:0,elevation:0},headerRight:()=><TouchableOpacity onPress={()=>navigation.openDrawer()}><Image source={require('./assets/image/icon-drawer.png')} resizeMode='contain' style={{width:35,height:30,marginRight:20}}/></TouchableOpacity>}}/>
    <HomeStack.Screen name="Detail" component={Detail}  options={{headerTitleAlign:"center",headerTintColor:'white',headerStyle:{shadowOpacity:0,elevation:0,backgroundColor:'#ef3143'},
      headerRight:()=><TouchableOpacity onPress={console.log(2)} style={{marginRight:15}}>
          <FontAwesome5 name="shopping-cart" size={20} color="white"/>
      </TouchableOpacity>}}/>
  </HomeStack.Navigator>
)


const ReviewStackNavigator = ({navigation}) =>(
  <ReviewStack.Navigator>
    <ReviewStack.Screen name="Review" component={Review} options={{headerTintColor:'white',headerStyle:{shadowOpacity:0,elevation:0,backgroundColor:'#ec3b4b'},headerLeft:()=><TouchableOpacity onPress={()=>navigation.navigate('Home')}><Image source={require('./assets/image/arrow-left.png')} resizeMode='contain' style={{width:25,height:30,marginLeft:20}}/></TouchableOpacity>}}/>
  </ReviewStack.Navigator>
)

export default function App(){
  return(
    <NavigationContainer >
      
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackNavigator} />
        <Drawer.Screen name="Review" component={ReviewStackNavigator} />
      </Drawer.Navigator>

      


      {/* <Stack.Navigator screenOptions={{headerShown:true,headerStyle:{backgroundColor:'#fff'}}} initialRouteName={'Home'}>
          
          <Stack.Screen name="Home" component={Home} options={{headerStyle:{shadowOpacity:0,elevation:0}}}/>
          
          <Stack.Screen name="Detail" component={Detail}/>
          
          <Stack.Screen name="Review" component={Review}/>
      
      </Stack.Navigator> */}
    
    </NavigationContainer>
    )
}
