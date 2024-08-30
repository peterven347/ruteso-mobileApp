import React, { useContext, useState } from "react"
import {Button, ImageBackground, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as Keychain from "react-native-keychain";
import {Context} from "../../Squarepay"
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import b_img from "../assets/iii.jpg"


export function SignIn({navigation}){
    const { setToken, setuserName, url } = useContext(Context)
    const [email, setEMail] = useState("e@gmail.com")
    const [password, setPassword] = useState("12345")
    const [hidePassword, setHidePassword] = useState(true);
    const [rememberMe, setRememberMe] = useState(true)
    const passwordProp = {
        color: "#000",
        placeholder: "Password",
        placeholderTextColor: "#ccc",
        textContentType: 'password',
        keyboardType: 'ascii-capable',
        secureTextEntry: hidePassword,
        spellCheck: false,
        caretHidden: true,
        autoCompleteType: false,
        autoCorrect: false,
        contextMenuHidden: true
    }

    const login = async () => {
        const val = await fetch(`${url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                eMail: email,
                password: password,
            })
        })
        const { firstName, token } = await val.json()
        await Keychain.setGenericPassword(firstName, token)
        setToken(token)
        setuserName(firstName)
    }

    return(
        <>
        <ImageBackground source={b_img} style={{flex: 1,}} resizeMode="cover">
            <View style={{marginTop: 16, width:"80%", height: "50%", alignSelf:"center", justifyContent:"space-evenly"}}>
                <TextInput style={{color: "black", backgroundColor: "#fff", width:"100%", height: 50, borderRadius: 6, fontSize: 14}} placeholder="Email" placeholderTextColor= "#ccc" onChangeText={e => setEMail(e)} maxLength={40}></TextInput>
                <View>
                    <TextInput style={{color: "black", backgroundColor: "white", width:"100%", height: 50, borderRadius: 6, fontSize: 14}} {...passwordProp} onChangeText={e => setPassword(e)} maxLength={40}></TextInput>
                    <Mci name={hidePassword? "eye" : "eye-off"} size={20} color="#666" style={{ position: 'absolute', left: 18, top: 14 }} onPress={() =>{setHidePassword(!hidePassword)}}/>
                </View>
                <View style={{flexDirection: "row", justifyContent:"space-between", marginVertical: 20}}>
                    <View style={{flexDirection: "row"}}>
                        {/* <Mci name={rememberMe? "checkbox-marked": "checkbox-blank-outline"} size={20} onPress={() => {setRememberMe(!rememberMe)}}/>
                        <Text>Remember me</Text> */}
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Reset Password")}>
                        <Text style={{color: "#ddd", fontWeight: "bold"}}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <Button color="#f44" title="Sign In" onPress={login}/>
                <Button color="#f44" title="Sign Up" onPress={() => navigation.navigate("Sign Up")}/>
            </View>
        </ImageBackground>
        </>
    )
}




export function ForgotPassword({navigation}){
    return(
        <>
        <ImageBackground source={b_img} style={{flex: 1,}} resizeMode="stretch">
            <View style={{marginTop: 16, width:"80%", height: "45%", alignSelf:"center", }}>
                <Text>E-mail</Text>
                <TextInput style={{width:"100%", borderBottomWidth: 1, textAlignVertical:"bottom", padding: 0, fontSize: 16}} autoCorrect={false} placeholder="your E-mail address" maxLength={40}></TextInput>
                <View style={{margin: 30, alignSelf:"center"}}>
                    <Button color="#f33" title="Submit" />
                </View>
            </View>
        </ImageBackground>
        </>
    )
}