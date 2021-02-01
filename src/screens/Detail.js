import React, { useEffect, useState } from 'react'
import {View,Text, Image,StatusBar,ScrollView,Animated,Dimensions, TouchableOpacity, FlatList} from 'react-native'
import { colors, fakeData } from '../constants/fakeData';

export const Detail = ({route,navigation}) =>{

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const {width,height} = Dimensions.get('screen')

    const [products,setProducts] = useState({})

    useEffect(()=>{
        let {item} = route.params;
        setProducts(item)
    },[products])

    const DATA = [
        {img:products.img,key:0},
        {img:products.img,key:1},
        {img:products.img,key:2}
    ]

    const Indicator = ({scrollX}) =>{

        return(
            <View style={{position:"relative",flexDirection:"row",justifyContent:"center",bottom:30}}>
                {DATA.map((_,i)=>{
                    const inputRange = [(i-1) * width, i * width, (i+1)*width];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange:[0.6,0.9,0.6],
                        extrapolate:'clamp'
                    })
                    

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange:[0.6,0.9,0.6],
                        extrapolate:'clamp',
                    
                    })

                    return(
                        <Animated.View key={`indicator-${i}`}
                        style={{
                            height:20,
                            width:20,
                            borderRadius:10,
                            backgroundColor: colors.actionDot,
                            marginHorizontal:3,
                            opacity,
                            
                            transform:[
                              {
                                scale,
                              }
                            ]
                            
                          }}
                        >

                        </Animated.View>
                    )
                })}
            </View>
        )
    }

    return(
        <ScrollView style={{flex:1,position:"relative"}}>
            <StatusBar backgroundColor='#ef3143' barStyle="light-content"/>
            <View style={{backgroundColor:'#ef3143',height:170}}>
                <View style={{width:300,height:200,flexDirection:'row',marginTop:20,justifyContent:'space-between'}}>
                <FlatList
                    data={DATA}
                    keyExtractor={item=>`${item.key}`}
                    scrollEventThrottle={32}hh
                    onScroll={Animated.event(
                        [{nativeEvent:{contentOffset:{x:scrollX}}}],
                        {useNativeDriver:false}
                        )}
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item})=>{
                        return(
                            <View key={item.key} style={{width:300,height:200,backgroundColor:'white',position:'relative',top:10}}>
                    <Image source={item.img} resizeMode="center" style={{width:270,height:220,position:'absolute'}}/>
                    <View style={{width:60,height:60,borderRadius:50,backgroundColor:colors.offer,alignSelf:'flex-end',position:'absolute'}}>
                        <Text style={{color:'white',fontSize:20,textAlign:'center',paddingTop:15,fontWeight:'bold'}}>
                            ${products.price}
                        </Text>
                    </View>
                </View>
                        )
                    }}
                />
                </View>
                <View style={{zIndex:100,marginTop:60}}>
                <Indicator scrollX={scrollX}/>

                </View>
            </View>
            <View style={{flex:4,flexDirection:"column",justifyContent:"center",height:height-220,position:'relative',top:100}}>
                <TouchableOpacity style={{alignItems:'center'}}>
                    <View style={{backgroundColor:colors.offer,width:130,padding:8,borderRadius:20}}>
                        <Text style={{fontSize:17,color:'white',fontWeight:"bold",textAlign:"center"}}>ADD CART</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection:"column",alignItems:"center"}}>
                    <Text style={{fontSize:24,fontWeight:"bold",marginTop:20}}>{products.title}</Text>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Text style={{fontSize:16,color:'#44d9e7'}}>4.3</Text>
                    <Image source={require('../../assets/image/stars.png')} style={{width:110}} resizeMode="center" />
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Text>1.KG</Text>
                        <Image source={require('../../assets/image/red-dot.png')} style={{width:25,marginHorizontal:8}} resizeMode="center" />
                        <Text>50 KKAL</Text>
                    </View>
                    <Text style={{width:280,textAlign:"center",fontSize:15}}>
                        {products.description}
                    </Text>
                </View>
                
                <View style={{marginTop:60,alignItems:'flex-end'}}>
                    <View style={{width:width-10,height:150,borderRadius:35,position:'relative',left:10,backgroundColor:'white',alignItems:'center'}}>    
                        <TouchableOpacity>
                            <View style={{position:'relative',bottom:35,left:120,width:70,height:70,backgroundColor:colors.offer,borderRadius:50}}>
                                <Text style={{fontSize:45,color:'white',textAlign:'center'}}>+</Text>
                            </View>
                        </TouchableOpacity>
                    
                        <TouchableOpacity>
                            <View style={{backgroundColor:colors.offer,width:200,position:'relative',bottom:35,height:50,borderRadius:50}}>
                                <Text style={{fontSize:20,color:'white',fontWeight:'bold',textAlign:'center',paddingTop:11}}>
                                    ODER NOW
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

        </ScrollView>
    )
}