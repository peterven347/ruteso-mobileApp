import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import Ant from 'react-native-vector-icons/AntDesign';
import Ion from 'react-native-vector-icons/Ionicons';
import Fea from 'react-native-vector-icons/Feather';
import { Context } from '../../Squarepay';
import CartView from './CartView';
const Stack = createNativeStackNavigator();
const dheight = Dimensions.get('window').height;
let expense;
let cart;

function NumericInput(props) {
    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <View style={{ alignItems: 'center', width: 50 }}>
                    <Text>{props.unit}</Text>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'orange',
                                borderTopLeftRadius: 4,
                                borderTopRightRadius: 4,
                            }}>
                            <Ant
                                name="plus"
                                size={24}
                                color="#fafef9"
                                onPress={() => {
                                    props.increaseQty();
                                }}
                            />
                        </TouchableOpacity>
                        <TextInput
                            value={(props.quantity).toString()}
                            onChangeText={(text) => {
                                props.changeQty(text)
                            }}
                            maxLength={3}
                            keyboardType="numeric"
                            style={{ color: "#444", fontSize: 16, textAlign:"center" }}
                        />
                        <TouchableOpacity>
                            <Ant
                                name="minus"
                                size={24}
                                color="#fafef9"
                                style={{
                                    backgroundColor: 'orange',
                                    borderBottomLeftRadius: 4,
                                    borderBottomRightRadius: 4,
                                }}
                                onPress={() => {
                                    props.decreaseQty();
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}


function Qty({ item }) {
    const setData  = useContext(Context).setData;
    const increaseQty = (_id, maxi_quantity, mini_quantity) => {
        setData((prevData) =>
            prevData.map((item) => {
                // for mini_quantity
                if (item._id == _id && mini_quantity || item._id == _id && mini_quantity == 0) {
                    return {
                        ...item,
                        mini_quantity: +item.mini_quantity + 1,
                        cost: item.maxi_price * item.maxi_quantity + item.mini_price * item.mini_quantity,
                    };
                }
                // for maxi_quantity
                if (item._id == _id && maxi_quantity || item._id == _id && maxi_quantity == 0) {
                    return {
                        ...item,
                        maxi_quantity: +item.maxi_quantity + 1,
                        cost: item.maxi_price * item.maxi_quantity + item.mini_price * item.mini_quantity,
                    };
                }
                return item;
            })
        );
    };
    const decreaseQty = (_id, maxi_quantity, mini_quantity) => {
        setData((prevData) =>
            prevData.map((item) => {
                if (item._id == _id && mini_quantity || item._id == _id && mini_quantity == 0) {
                    //remove the OR to reflect changes in maxi when mini reaches 0
                    return {
                        ...item,
                        mini_quantity:
                            item.mini_quantity <= 0 ? 0 : item.mini_quantity - 1,
                        cost:
                            item.maxi_price * item.maxi_quantity +
                            item.mini_price * item.mini_quantity,
                    };
                }
                if (item._id == _id && maxi_quantity || item._id == _id && maxi_quantity == 0) {
                    return {
                        ...item,
                        maxi_quantity:
                            item.maxi_quantity <= 0 ? 0 : item.maxi_quantity - 1,
                        cost:
                            item.maxi_price * item.maxi_quantity +
                            item.mini_price * item.mini_quantity,
                    };
                }
                return item;
            })
        );
    };
    const changeQty = (_id, text, maxi_quantity, mini_quantity) => {
        setData((prevData) =>
            prevData.map((item) => {
                if (item._id == _id && mini_quantity || item._id == _id && mini_quantity == 0) {
                    return {
                        ...item,
                        mini_quantity: +text,
                        cost:
                            item.maxi_price * item.maxi_quantity +
                            item.mini_price * item.mini_quantity,
                    };
                }
                if (item._id == _id && maxi_quantity || item._id == _id && maxi_quantity == 0) {
                    return {
                        ...item,
                        maxi_quantity: +text,
                        cost:
                            item.maxi_price * item.maxi_quantity +
                            item.mini_price * item.mini_quantity,
                    };
                }
                return item;
            })
        );
    }
    return (
        <View style={{ flexDirection: 'row', marginRight: 14 }}>
            {/* for maxi */}
            <NumericInput
                _id={item._id}
                unit={item.maxi_unit}
                quantity={item.maxi_quantity}
                qty_type="maxi"
                increaseQty={() => increaseQty(item._id, item.maxi_quantity)}
                decreaseQty={() => decreaseQty(item._id, item.maxi_quantity)}
                changeQty={(text) => changeQty(item._id, text, item.maxi_quantity)}
            />
            {/* for mini  */}
            <NumericInput
                _id={item._id}
                unit={item.mini_unit}
                quantity={item.mini_quantity}
                increaseQty={() => increaseQty(item._id, item.maxi_quantity, item.mini_quantity)}
                decreaseQty={() => decreaseQty(item._id, item.maxi_quantity, item.mini_quantity)}
                changeQty={(text) => changeQty(item._id, text, item.maxi_quantity, item.mini_quantity)}
            />
        </View>
    );
}

function A({ item }) {
    const { data, setData, url }  = useContext(Context);
    const openQty = (id) => {
        setData((prevData) =>
            prevData.map((i) => {
                if (i._id == id) {
                    return {
                        ...i,
                        initialState: !i.initialState,
                        checkState:
                            i.initialState == false && i.checkState == false
                                ? true
                                : i.checkState == true
                                    ? true
                                    : false,
                    };
                }
                return { ...i, initialState: false };
            })
        );
    };
    const toggleItemSelection = (_id) => {
        const selected = data.map((item) =>
            item._id === _id
                ? {
                    ...item,
                    checkState: !item.checkState,
                    cost:
                        item.maxi_price * item.maxi_quantity +
                        item.mini_price * item.mini_quantity,
                }
                : item
        );
        setData(selected);
    };
    return (
        <>
            <View style={{ marginHorizontal: 2 }}>
                <View style={styles.toggle}>
                    {item.checkState ? (
                        <View
                            style={{ ...styles.checkState, backgroundColor: "cyan" }}
                            onStartShouldSetResponder={() => {
                                toggleItemSelection(item._id);
                            }}>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.checkState}
                            onPress={() => {
                                toggleItemSelection(item._id);
                            }}>
                        </TouchableOpacity>
                    )}
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                        }}
                        source={{
                            uri: `${url}/${item.img}`,
                            cache: 'reload',
                            headers: { Pragma: 'no-cache' },
                        }}
                    />
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'orange',
                    }}>
                    <Text style={{ color: '#fafef9' }}>{item.name}</Text>
                    <Mci name="plus" color="#fafef9" size={34}
                        onPress={() => {
                            openQty(item._id);
                        }}
                    />
                </View>
                {(item.checkState && (
                    <Text>
                        ₦
                        {
                            (item.cost =
                                item.maxi_price * item.maxi_quantity +
                                item.mini_price * item.mini_quantity)
                        }
                    </Text>
                )) || <Text> </Text>}
            </View>
            {item.initialState ? <Qty item={item} /> : null}
        </>
    );
}

function Render({ category, matchCheck }) {
    return (
        <>
            {[category].map((item) =>
                matchCheck === '' ? (
                    <A item={item} key={(item) => item._id} />
                ) : matchCheck ===
                    item.name
                        .toUpperCase()
                        .substr(
                            item.name.toUpperCase().indexOf(matchCheck),
                            matchCheck.length
                        ) ? (
                    <A item={item} key={(item) => item._id} />
                ) : null
            )}
        </>
    );
}

function MainPage({ _item, navigation }) {
    const { isFetching, setIsFetching, data, fetchData } = useContext(Context);
    useEffect(() => {
        fetchData()
    }, [])
    const categories = [...new Set(data.map((item) => item.category))];
    const [textInput, setTextInput] = useState('');
    const matchCheck = textInput.toUpperCase();
    cart = data.filter((i) => {
        return i.checkState === true && i.cost > 0;
    });
    expense = cart.reduce((acc, i) => {
        return (
            acc + (i.maxi_price * i.maxi_quantity + i.mini_price * i.mini_quantity)
        );
    }, 0);

    const renderItem = ({ item }) => (
        <View style={styles.ContainerView}>
            {textInput === '' && (
                <Text
                    style={{
                        marginStart: 8,
                        marginEnd: 8,
                        fontSize: 22,
                        color: 'orange',
                    }}>
                    {item}
                </Text>
            )}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data.filter((i) => i.category === item)}
                keyExtractor={(item, index) => item._id || index}
                renderItem={({ item: category, index }) => (
                    <Render itemm={_item} category={category} matchCheck={matchCheck} />
                )}
                style={{ marginStart: 8, marginEnd: 8 }}
                ListEmptyComponent={ () => {
                    return showIndicator? (
                        <View style={{ marginTop: 140 }}>
                            <ActivityIndicator size={56} color="#ffa500" />
                        </View>
                    ) : <Text style={{alignSelf: "center"}}>An error occured</Text>
                }}
                />
        </View>
    );

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Text style={{ color: 'black', fontSize: 14, marginTop: 4 }}>
                Expense: <Text style={{fontSize: 16}}>₦{expense || null}</Text>
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginVertical: 8,
                }}>
                <View style={{ width: '80%' }}>
                    <TextInput
                        style={{
                            width: 250,
                            alignSelf: 'center',
                            paddingHorizontal: '16%',
                            borderBottomWidth: 1,
                            borderRadius: 6,
                            color: "#444",
                            borderColor: '#ccc',
                        }}
                        placeholder=" search"
                        placeholderTextColor="#bbb"
                        // cursorColor= "#888"
                        fontSize={20}
                        value={textInput}
                        maxLength={15}
                        onChangeText={(e) => setTextInput(e)}
                    />
                    <Ion
                        name="search"
                        size={22}
                        color="#bbb"
                        style={{ position: 'absolute', left: '15%', top: 12 }}
                    />
                    {textInput && (
                        <Fea name="x" size={20} color="#444" style={{ position: 'absolute', right: '20%', top: 14 }}
                            onPress={() => {
                                setTextInput('');
                            }}
                        />
                    )}
                </View>
                <Ant name="shoppingcart" size={40} color="orange"
                    onPress={() => navigation.navigate(CartView)}
                    style={{ marginTop: 8 }}
                />
                <View style={{ marginEnd: '8%' }}></View>
            </View>
            <FlatList
                onRefresh={() => {
                    setIsFetching(true);
                    fetchData();
                }}
                refreshing={isFetching}
                data={categories}
                keyExtractor={(item, index) => item || index}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={{ marginTop: 240 }}>
                        <ActivityIndicator animating={!isFetching} size={56} color="orange" />
                    </View>
                }
                contentContainerStyle={{ padding: 4, marginBottom: 180 }}
                // keyboardShouldPersistTaps="always"
            />
        </View>
    );
}

export default function Marketplace() {
    return (
        <>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="CartView">
                {() => <CartView cart={cart} expense={expense} />}
            </Stack.Screen>
        </Stack.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    toggle: {
        width: 200,
        height: 120,
        backgroundColor: '#999',
        position: 'relative',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    ContainerView: {
        // marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingVertical: 10,
        // backgroundColor: '#F5F5F5',
    },
    checkState: {
        width: 20,
        height: 20,
        borderColor: '#888',
        borderWidth: 4,
        borderRadius: 10,
        position: 'absolute',
        top: 4,
        right: 4,
        zIndex: 1,
    }
});
