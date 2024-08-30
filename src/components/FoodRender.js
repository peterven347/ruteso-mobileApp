import React, { useContext, useEffect, useState } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Mci from 'react-native-vector-icons/MaterialCommunityIcons'
import {FoodContext} from "../../Squarepay"


export default function Render(props) {
    // const [data, setData] = useState([].concat(...Object.values(useContext(FoodContext))))
	const [data, setData] = useState(useContext(FoodContext))
    // const [elementVisible, setElementVisible] = useState(useContext(FoodContext).map(item => item.initialState));
    // const [elementVisible, setElementVisible] = useState(data.map(item => item.initialState == true));
    const [modalState, setModalState] = useState(null)
    // const [counter, setCounter] = useState(5000)
    const [t, setT] = useState(0)

    // const autoClose = () => {
    //     const updatedStates = elementVisible.map(() => false);
    //     setElementVisible(updatedStates);
    //     // setData(prevData => 
    //     //     prevData.map(i => {
    //     //         return{...i, initialState: false}
    //     //     })
    //     // )
    //     console.log("data")
    // };
    const open = (item) => {
        console.log(item)
        setData((prevData) =>
            prevData.map((i) => {
                if (i._id == item._id) {
                    return { ...i, initialState: !i.initialState };
                }
                // return i
            })
        );
    }
    // const ope = (id) => {
        // clearTimeout(t)
        // const updatedStates = elementVisible.map((i, idx) => idx === id ? !i.initialState : false)
        // const updatedStates = [...elementVisible];
        // updatedStates[index] = !updatedStates[index]
        // setElementVisible(updatedStates)
        // autoClose()
        // setData(prevData => 
        //     prevData.map(item => {
        //         if (item._id == _id) {
        //             return { ...item, initialState: !item.initialState };
        //         }
        //         return item
        //     })
        // )
        // setT(setTimeout(autoClose, 1000))
    // };



    function Qty() {
        return (
                <View style={{width: 24, height: 74}}>
                    <View style={{height: "25%", backgroundColor: "blue"}}><Text>4</Text></View>
                    <View style={{height: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}><Text>4</Text></View>
                    <View style={{height: "25%", backgroundColor: "blue"}}><Text>4</Text></View>
                </View>
        )
    }
    return (
        <>
            <View style={{ paddingEnd: 40 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
                    {[props.category].map((item) => (

                        <>
                            <View key={Math.random()} style={{ marginHorizontal: 2, marginBottom: 20 }}>
                                {/* <Image style={styles.moon} source={item.img} /> */}
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "grey" }}>
                                    <Text>{item.name}</Text>
                                    <Mci name="plus" color="blue" size={34} onPress={() => { open(item) }} />
                                </View>
                                <View style={{}}>{modalState}</View>
                            </View>
                            <View key={Math.random()}>
                                {item.initialState &&   
                                    <View style={{ paddingEnd: 12 }}>
                                        {
                                            <>
                                                <Qty />
                                                {/* <Qty /> */}
                                            </>
                                        }
                                    </View>
                                }
                            </View>
                        </>
                     ))}
                </ScrollView>
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