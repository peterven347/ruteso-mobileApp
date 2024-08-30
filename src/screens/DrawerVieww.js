import React, {useContext} from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Button} from "react-native-paper"
import Mci from 'react-native-vector-icons/MaterialCommunityIcons'
import Ion from 'react-native-vector-icons/Ionicons'
import {Context} from "../../Squarepay"
import { resetGenericPassword } from 'react-native-keychain';
import b_img from "../assets/sss.png"

// set data to null on signout
// set data to null on signout
// set data to null on signout

function Divider(props){
    return (
        <View style={{ 
        width: "100%",
        margin: 14,
        alignSelf:"center",
        borderBottomColor: props.color, 
        borderBottomWidth: StyleSheet.hairlineWidth
        }}/> 
    )
}  

function DrawerItem(props){
    return(
        <>
        <TouchableOpacity style={{paddingStart: 6, flexDirection: "row"}} onPress={() => {props.navigateFn()}}>
            <props.Icon name={props.icon} color="rgb(237, 130, 7)" size={24} style={{width: 25, height: 25, backgroundColor: "#fff", borderRadius: 50}}/>
            <Text style={{fontSize: 16, marginHorizontal: 2, fontWeight: 400, paddingStart: 8, color: "#444"}}>{props.name}</Text>
        </TouchableOpacity>
        <Divider color="#faf9f6"/>
        </>
    )
}

export default function DrawerVieww({navigation}){
    const { setToken } = useContext(Context)
    
    function navigateScr(screen){
        navigation.navigate(screen)
    }
    return(
        <>            
            <ImageBackground source={b_img} style={{flex:0.4, marginBottom:12}}>
                <Text>Peterven</Text>
            </ImageBackground>
            <View style={{flex:1, backgroundColor: "#fbfcf8"}}>
                <DrawerItem Icon={Mci} icon="book-open" name="Manage me" navigateFn= {() => navigateScr("St")}/>
                <DrawerItem Icon={Ion} icon="settings" name="Preferences" navigateFn= {() => navigateScr("St")}/>
                <DrawerItem Icon={Ion} icon="people" name="Beneficiaries" navigateFn= {() => navigateScr("St")}/>
                <DrawerItem Icon={Mci} icon="account-star" name="Register as a Vendor" navigateFn= {() => navigateScr("St")}/>

                <Divider color="orange"/>
                <Button
                    textColor="orange"
                    rippleColor="orange"
                    icon="arrow-right-thin"
                    mode="text"
                    onPress={() => {resetGenericPassword(); setToken(null);}}>
                    Sign out
                </Button>
            </View>
        </>
    )
}