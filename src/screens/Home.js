import React from 'react'
import {View,FlatList,Text,Dimensions, StatusBar, Image,Animated,ScrollView,TouchableOpacity, StyleSheet} from 'react-native'
import { FocusAwareStatusBar } from '../components/FocusAwareStatusBar';
import { colors, fakeData } from '../constants/fakeData';

const {width,height} = Dimensions.get('screen')

export const Home = ({navigation}) =>{

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const DATA = [
        {img:require('../../assets/image/main.png'),key:'0'},
        {img:require('../../assets/image/main.png'),key:'1'},
        {img:require('../../assets/image/main.png'),key:'2'}
    ]


    const Indicator = ({scrollX}) =>{
        return(
            <View style={styles.indicatorContainer}>
                {DATA.map((_,i)=>{
                    const inputRange = [(i-1)*width, i*width,(i+1)*width];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange:[0.6,0.9,0.6],
                        extrapolate:'clamp'
                    })

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange:[0.6,0.9,0.6],
                        extrapolate:'clamp'
                    })

                    return(
                        <Animated.View
                            key={`indicator-${i}`}
                            style={{
                                height:20,
                                width:20,
                                borderRadius:10,
                                backgroundColor:colors.actionDot,
                                marginHorizontal:3,
                                opacity,
                                top:20,
                                transform:[
                                    {
                                        scale
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

    const renderItem = ({item}) =>{
        return(
            <TouchableOpacity onPress={()=>navigation.navigate('Detail',{item:item})}>
                <View style={styles.itemContainer}>
                <View>
                    <Image
                        source={item.img}
                        resizeMode="contain"
                        style={{
                            width:150,
                            height:100
                        }}
                    />
                </View>
                <View style={{flexDirection:'column',position:'relative'}}>
                        <View style={{position:'absolute',top:-10,right:-15}}>
                            <Image
                                source={require('../../assets/image/newOffer.png')}
                                resizeMode="contain"
                                style={{
                                    width:100,
                                    height:40
                                }}
                            />
                        </View>
                        <Text style={{marginTop:50,fontSize:20}}>
                            {item.title}
                        </Text>
                </View>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff"/>
            <View style={{flex:2.5,backgroundColor:colors.bg}}>
                <FlatList
                    data={DATA}
                    keyExtractor={item=>item.key}
                    scrollEventThrottle={32}
                    onScroll={Animated.event(
                        [{nativeEvent:{contentOffset:{x:scrollX}}}],
                        {useNativeDriver:false}
                    )}

                    pagingEnabled
                    horizontal
                    contentContainerStyle={{paddingBottom:100}}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item})=>{
                        return(
                            <View style={{width}} key={item.key}>
                                <Image
                                    source={item.img}
                                    resizeMode="contain"
                                    style={{width,height:210}}
                                />
                            </View>
                        )
                    }}
                />

                <Indicator scrollX={scrollX}/>
            </View>

            <View style={{flex:5,backgroundColor:colors.bg}}>
                    <View>
                        <Text style={styles.categoryText}>Category</Text>
                        <FlatList
                            data={fakeData}
                            keyExtractor={item=>item.key}
                            renderItem={renderItem}
                        />
                    </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width
    },
    indicatorContainer:{
        position:"relative",
        flexDirection:"row",
        justifyContent:"center",
        bottom:30
    },
    itemContainer:{
        marginHorizontal:15,
        borderRadius:15,
        padding:10,
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:'#fff',
        marginVertical:15
    },
    categoryText:{
        fontSize:20,
        marginLeft:15,
        marginBottom:15
    }

})
