import React from 'react'
import {View,Text,StatusBar, Image, FlatList,ScrollView,Dimensions,VirtualizedList, TouchableOpacity} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import {colors, fakeReview} from '../constants/fakeData'

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);


const {width} = Dimensions.get('screen')



const renderItem = ({item}) =>{

    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
      });

      unsubscribe();  

    return(
        <View style={{width:width-20,paddingLeft:10,marginBottom:20,paddingTop:10,paddingBottom:30,backgroundColor:'white',alignContent:"flex-start",borderTopRightRadius:10,borderBottomRightRadius:10}}>
            

            <View style={{marginTop:25,flexDirection:'row'}}>
                <Image source={item.userImage} resizeMode="center" style={{width:60,height:60}}/>
                <View style={{paddingRight:80,marginLeft:20}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{fontSize:20,color:'#000',fontWeight:'bold'}}>{item.user}</Text>
                    <Image source={require('../../assets/image/stars.png')} resizeMode="center" style={{width:70,height:10}}/>

                    </View>
                    <Text style={{marginVertical:5,fontSize:15,color:'#687178'}}>{item.date}</Text>
                    <Text style={{fontSize:15,color:'#252525'}}>{item.review}</Text>
                </View>
            </View>
        </View>
    )
}

export const Review = () =>{
    return(
        <View style={{flex:1,backgroundColor:'#ec3b4b',position:'relative'}}>
            <StatusBar backgroundColor='#ec3b4b' barStyle="light-content"/>
            <View style={{alignItems:'center'}}>
                <Image source={require('../../assets/image/onion.png')} style={{width:300,height:250}} resizeMode="contain"/>
            </View>

            <ScrollView>
                <FlatList
                    data={fakeReview}
                    keyExtractor={item=>`${item.id}`}
                    renderItem={renderItem}
                />

                <TouchableOpacity onPress={console.log('press')}>
                
                <View style={{width:250,height:50,borderRadius:50,backgroundColor:colors.offer,position:'relative',bottom:40,left:50}}>
                    <Text style={{color:'white',fontSize:21,textAlign:'center',fontWeight:'bold',paddingTop:10}}>
                        ADD REVIEW
                    </Text>
                </View>
                </TouchableOpacity>
            </ScrollView>
            
            
        </View>
    )
}