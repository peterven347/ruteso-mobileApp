import React, {useContext, useEffect, useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons'
import { FoodContext } from "../../Squarepay"
import moon from "../assets/moon.png"
export default function History({_item}){
    const [data, setData] = useState(useContext(FoodContext))
    const list = [...new Set(["a","b","a","b","c"])]
    
    function Qty() {
        return (
                <View style={{width: 24, height: 74}}>
                    <View style={{height: "25%", backgroundColor: "blue"}}><Text>4</Text></View>
                    <View style={{height: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}><Text>4</Text></View>
                    <View style={{height: "25%", backgroundColor: "blue"}}><Text>4</Text></View>
                </View>
        )
    }
    
    function Render({item, category}) {
        const [t, setT] = useState(0)
    
        const open = (id) => {
            // clearTimeout(t)
            setData( (prevData) =>
                prevData.map((i) => {
                    if (i._id == id) { return { ...i, initialState: !i.initialState }; }
                    return {...i, initialState: false}
                })
            );
            // setT(setTimeout(autoClose, 30000))
        };

        const autoClose = () => {
            setData(prevData => 
                prevData.map(i => {
                    return{...i, initialState: false}
                })
            )
        };
    
    
        return (
            <>
                {[category].map((item, index) => (
                    <>
                        <View key={Math.random()} style={{ marginHorizontal: 2, marginBottom: 20 }}>
                            {/* <Image style={styles.moon} source={item.img} /> */}
                            <Image style={styles.moon} source={moon} />
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "grey" }}>
                                <Text>{item.name}</Text>
                                <Mci name="plus" color="blue" size={34} onPress={() => { open(item._id) }} />
                            </View>
                        </View>
                        <View key={Math.random()}>
                            {item.initialState ?  
                                <View style={{ paddingEnd: 12 }}>
                                    {
                                        <>
                                            <Qty />
                                            {/* <Qty /> */}
                                        </>
                                    }
                                </View> : null
                            }
                        </View>
                    </>
                ))}
            </>
        )
    }

    return (
        <>
            <Text style={{ color: "black", fontSize: 14, marginTop: 4 }}> Expense: ₦</Text>
            <View style={{backgroundColor: "white", padding: 4}}>
                {list.map((item, index) => (
                    <>
                        <Text>{item}</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ }}>
                            {data.map(i => (i.category == item?
                                <Render category={i} item={_item} key={Math.random()}/>:null
                                ))
                            }
                        </ScrollView>
                    </>
                ))}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    moon: {
        // resizeMode: "contain",
        width: 80,
        height: 40,
        backgroundColor: "grey",
    }
})



