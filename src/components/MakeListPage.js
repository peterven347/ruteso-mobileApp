import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import CheckBox from "react-native-check-box"
import Ant from "react-native-vector-icons/AntDesign";
import Ion from "react-native-vector-icons/Ionicons";
import Fea from "react-native-vector-icons/Feather";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Context} from "../../Squarepay"
import {FoodContext} from "../../Squarepay"

const Stack = createNativeStackNavigator()

function NumericInput(props){
	const [currItem, setCurrItem] = useState({})

	return(
		<View style={{display: "flex", flexDirection: "row"}}>
			<View style={{display: "flex", alignItems: "center"}}>
				<View style={{alignItems: "center", width: 50}}><Text>{props.unit}</Text></View>
				<View style={{display: "flex", flexDirection: "row", alignItems:"center", }}>
					<View style={{alignItems: "center"}}>
						<Ion name='ios-arrow-up' size={24} style={{ backgroundColor: "blue", borderTopLeftRadius: 4, borderTopRightRadius: 4}} onPress={() => {props.increaseQty()}}/>
						<Text>{props.quantity}</Text>
						<Ion name='ios-arrow-down' size={24} style={{ backgroundColor: "blue", borderBottomLeftRadius: 4, borderBottomRightRadius: 4}} onPress={() => {props.decreaseQty()}} />
					</View>
				</View>
			</View>
		</View>
	)
}


export default function ListPage({navigation}) {
	const {url} = useContext(Context)
	const [data, setData] = useState(useContext(FoodContext))
	const [textInput, setTextInput] = useState("")
	const matchCheck = textInput.toUpperCase()
	const cart = data.filter(i => {
		return i.checkState === true && i.cost > 0
	})
	const expense = cart.reduce((acc, i) => {
		return acc + (i.maxi_price*i.maxi_quantity + i.mini_price*i.mini_quantity) * i.multiplier;
	}, 0);

	
	const renderItems= ({ item }) => (
		matchCheck === ""?
		// null
			<A item={item}/>
			:matchCheck === item.name.toUpperCase()
		.substr(item.name.toUpperCase().indexOf(matchCheck), textInput.length)?
			<A item={item} />
		:null
	);

	const renderCart = ({ item }) => (
		<View style={{ backgroundColor: "blue", margin: 2 }}>
			<Text style={{ color: "white", fontSize: 20, fontWeight: "500", maxWidth: "25%" }}>{item.name}</Text>
		</View>
	);
	
	const cost = async() => {
		console.log(76456)
		const options = {
			// headers: {
			// 	Authorization: "Bearer " + token,
			// },
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(cart)
		}
		const cost = await fetch(`${url}/cost`, options)
		const { costVal } = await cost.json()
		console.log(costVal)
		
	};

	// const sendCart = () => {
	// 	fetch(`${url}/cost`, {
	// 		headers: {
	// 			Authorization: "Bearer " + token,
	// 		},
	// 		method: "POST",
	// 		body: JSON.stringify(cart)
	// 	})
	// 	console.log(res.json())
	// 	console.log(76456)
	// }


	function A({ item }) {
		const updateItem = (_id) => {
			setData((prevData) =>
				prevData.map((item) => {
					if (item._id == _id) {
						return { ...item, checkState: !item.checkState, cost: (item.maxi_price*item.maxi_quantity + item.mini_price*item.mini_quantity) * item.multiplier };
					}
					return item
				})
			);
		}
		const increaseQty = (_id, maxi_quantity, mini_quantity) => {
			setData((prevData) =>
				prevData.map((item) => {
					if(item._id == _id && mini_quantity || item._id == _id && mini_quantity == 0){
						return { ...item, mini_quantity:item.mini_quantity+1, cost: (item.maxi_price*item.maxi_quantity + item.mini_price*item.mini_quantity) * item.multiplier };
					}
					if(item._id == _id && maxi_quantity || item._id == _id && maxi_quantity == 0){
						return { ...item, maxi_quantity:item.maxi_quantity+1, cost: (item.maxi_price*item.maxi_quantity + item.mini_price*item.mini_quantity) * item.multiplier };
					}
					return item
				})
			);
		};
		const decreaseQty = (_id, maxi_quantity, mini_quantity) => {
			setData((prevData) =>
				prevData.map((item) => {
					if(item._id == _id && mini_quantity || item._id == _id && mini_quantity == 0){ //remove the OR to reflect changes in maxi when mini reaches 0
						return { ...item, mini_quantity:item.mini_quantity <= 0? 0 : item.mini_quantity-1, cost: (item.maxi_price*item.maxi_quantity + item.mini_price*item.mini_quantity) * item.multiplier };
					}
					if(item._id == _id && maxi_quantity ){
						return { ...item, maxi_quantity:item.maxi_quantity <= 0? 0 : item.maxi_quantity-1, cost: (item.maxi_price*item.maxi_quantity + item.mini_price*item.mini_quantity) * item.multiplier };
					}
					return item
				})
			);
		};

		return (
			<>
				<View style={{ flexDirection: "row", backgroundColor: "#aaa", marginBottom: 1, alignItems: "center" }}>
					<View style={{width: 120}}>
						<View style={{flexDirection: "row", alignItems: "center"}}>
							<CheckBox isChecked={item.checkState} onClick={() => {updateItem(item._id)}} />
							<Text style={{ color: "black", fontSize: 20, fontWeight: "500", flexShrink: 1, paddingVertical: 5 }}>{item.name}</Text>
						</View>
						<Text style={{ color: "#555", fontSize: 12, }}>ertyufcewg</Text>
					</View>
					{item.checkState &&
						<>
							<NumericInput unit={item.maxi_unit} quantity={item.maxi_quantity} increaseQty={() => increaseQty(item._id, item.maxi_quantity)} decreaseQty={() => decreaseQty(item._id, item.maxi_quantity)}/>
							<NumericInput unit={item.mini_unit} quantity={item.mini_quantity} increaseQty={() => increaseQty(item._id, item.maxi_quantity, item.mini_quantity)} decreaseQty={() => decreaseQty(item._id, item.maxi_quantity, item.mini_quantity)}/>
							<View style={{ marginLeft: "6%", justifyContent: "space-evenly", alignItems: "center" }}>
								<Text style={{ color: "black"}}>Cost</Text>
								<Text style={{ color: "#333", fontWeight: "bold" }}>₦{item.cost = (item.maxi_price*item.maxi_quantity + item.mini_price*item.mini_quantity) * item.multiplier}</Text>
							</View>
						</>
					}
				</View>
			</>
		)
	}

	function MList(){
		return (
			<View>
				<Text style={{ color: "black", fontSize: 14, marginTop: 4 }}>Expense: ₦{expense}</Text>
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginVertical: 8 }}>
					<View style={{ width: "80%", }}>
						<TextInput style={{ backgroundColor: "white", width: 250, alignSelf: "center", paddingHorizontal: "16%", borderRadius: 6 }} placeholder=" search" cursorColor="lime" fontSize={20} value={textInput} onChangeText={e => setTextInput(e)}/>
						<Ion name="search" size={22} style={{ position: "absolute", left: "15%", top: 12 }} />
						{textInput && <Fea name="x" size={20} style={{ position: "absolute", right: "20%", top: 16 }} onPress={() => {setTextInput("")}}/>}
					</View>
					<Ant name="shoppingcart" size={40} color="#00f" onPress={() => navigation.navigate(Cart)}/>
					<View style={{ marginEnd: "10%" }}></View>
				</View>
				<View style={{paddingBottom: 180}}>
					<FlatList data={data} renderItem={renderItems} keyExtractor={(item) => item._id || item.id}/>
				</View>
			</View>
		)
	}

	function Cart(){
		return(
			<>
				<Text style={{ color: "black", fontSize: 14, marginTop: 4 }}>Expense: ₦{expense}</Text>
				<FlatList data={cart} renderItem={renderCart} keyExtractor={(item) => item._id}/>
				<Text style={styles.buyBtn} onPress={() => {cost()}}>Buy Now</Text>
			</>
		)
	}

	
	return(
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name="List" component={MList}/>
			<Stack.Screen name="Cart" component={Cart}/>
		</Stack.Navigator>
	)
};

const styles = StyleSheet.create({
	buyBtn: {
		width: "80%",
		height:24,
		backgroundColor: "#00F",
		alignSelf:"center",
		textAlign: "center"
	}
})