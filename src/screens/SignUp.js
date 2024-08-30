import React, { useContext, useState } from "react"
import { Alert, Button, ImageBackground, Text, TextInput, View } from "react-native";
import * as Keychain from "react-native-keychain";
import {Context} from "../../Squarepay"
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import b_img from "../assets/iii.jpg"


const nameRegex = /^[a-zA-Z\s]+$/
const emailRegex = /^(?=.{1,256}$)(?=.{1,64}@.{1,255}$)(?=[^@]+@[^@]+\.[a-zA-Z]{2,63}$)^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default function SignUp({navigation}) {
    const { setToken, setuserName, url } = useContext(Context)
    const [user, setUser] = useState({
        firstname: "testname",
        lastname: "testname",
        address: "testnameaddress",
        email: "peter@gmail.com",
        phonenumber: 12345678,
        password:"1qasw23edfr4"
    })

    const [hidePassword, setHidePassword] = useState(true);
    const passwordProp = {
        color: "#000",
        placeholder: "Password",
        placeholderTextColor: "#ccc",
        textContentType: "password",
        keyboardType: "ascii-capable",
        secureTextEntry: hidePassword,
        spellCheck: false,
        caretHidden: true,
        autoCompleteType: false,
        autoCorrect: false,
    }
    
    const verify = () => {
        return (nameRegex.test(firstname) && nameRegex.test(lastname) && address && emailRegex.test(email) && phonenumber && passwordRegex.test(password))
    }

    const register = async () => {
        if (verify){
            const val = await fetch(`${url}/register`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(user)
            })
            const { firstName, token } =  await val.json()
            await Keychain.setGenericPassword(firstName, token)
            setToken(token)
            setuserName(firstName)
        }
        return
    }

    return (
        <>
        <ImageBackground source={b_img} style={{flex: 1,}} resizeMode="cover">
            <View style={{ marginTop: 54, width: "80%",alignSelf: "center", flex: 1 }}>
                <TextInput style={{ color: "black", backgroundColor: "white", width: "100%", height: 50, borderRadius: 6, fontSize: 14, marginBottom: 14}} placeholder="Name" placeholderTextColor= "#ccc" onChangeText={e => { setUser((prev) => ({...prev, e})) }} maxLength={40}></TextInput>
                <TextInput style={{ color: "black", backgroundColor: "white", width: "100%", height: 50, borderRadius: 6, fontSize: 14, marginBottom: 14 }} placeholder="Email" placeholderTextColor= "#ccc" onChangeText={e => { setUser((prev) => ({...prev, e})) }} maxLength={40}></TextInput>
                <View>
                    <TextInput style={{backgroundColor: "white", width:"100%", height: 50, borderRadius: 6, fontSize: 14}} {...passwordProp} onChangeText={e => { setUser((prev) => ({...prev, e})) }} maxLength={40}></TextInput>
                    <Mci name={hidePassword? "eye" : "eye-off"} size={20} style={{ position: "absolute", right: 10, top: 14, marginStart: 30 }} onPress={() =>{setHidePassword(!hidePassword)}}/>
                </View>
                <View style={{width: "100%", height: 120}}></View>
                <View>
                    <Button color="#f44" title="Create Account" onPress={register} />
                    <Text style={{marginTop: 20, color: "#ddd", fontWeight: "bold"}}>Already have an Account?</Text>
                    <Button color="#f44" title=" SIGN IN" onPress={() => navigation.navigate("Sign In")} />
                </View>
            </View>
        </ImageBackground>
        </>
    )
}