import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Image, Modal, Pressable, ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FlatList, RectButton } from "react-native-gesture-handler";
import Ant from "react-native-vector-icons/AntDesign"
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Context } from '../../Squarepay';
import sss from "../assets/sss.png"

function renderLeftActions(progress, dragX, item, setData) {
    const trans = dragX.interpolate({
        inputRange: [0, 50, 51, 101],
        outputRange: [-20, 0, 0, 1],
    });
    const opacity = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    const toggleItemSelection = (_id) => {
        setData((prev) => (
            prev.map((item) =>
                item._id === _id
                    ? {
                        ...item,
                        checkState: !item.checkState,
                        cost:
                            item.maxi_price * item.maxi_quantity +
                            item.mini_price * item.mini_quantity,
                    }
                    : item
            )
        ));
    };

    return (
        <RectButton
            style={styles.leftAction}
            onPress={() => { toggleItemSelection(item?._id); }}
        >
            <Animated.View
                style={[
                    styles.actionView,
                    {
                        transform: [{ translateX: trans }],
                        opacity: opacity,
                    },
                ]}
            >
                <View
                    style={{ ...styles.checkState, backgroundColor: item?.checkState ? "cyan" : "" }}
                >
                </View>
            </Animated.View>
        </RectButton>
    );
};

const renderModal = ({ item, url, setModalView }) => {
    let modalContent = (
        <Modal transparent={true} animationType="slide" onRequestClose={() => setModalView(null)}>
            <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1, alignItems: "center" }} >
                <View style={{ marginTop: 266, width: "80%", height: 500, padding: 12, paddingTop: 0, borderRadius: 4, backgroundColor: "#fafef9" }}>
                    <Pressable style={{ width: 40, paddingTop: 4, alignSelf: "flex-end", alignItems: "flex-end" }} pressRetentionOffset={{ bottom: 30, left: 20, right: 20, top: 20 }} onPress={() => { setModalView(null) }}>
                        <Ant name="minuscircle" size={18} color="#888" />
                    </Pressable>
                    <Text style={{ color: "#222", alignSelf: "center" }}>{item.name}</Text>
                    <Image style={{ width: "auto", height: 120, borderRadius: 2, }}
                        // source={sss}
                        src={`${url}/${item?.img}`}
                    />
                    <Text style={[styles.modalText, { color: "#0c0" }]}>Nutritional constituent:</Text>
                    <Text style={styles.modalText}>Calcium: 5%</Text>
                    <Text style={styles.modalText}>Nitrogen: 2.5%</Text>
                    <Text style={styles.modalText}>Iron: 22%</Text>
                    <Text style={styles.modalText}>Fibre: 57%</Text>
                    <ScrollView directionalLockEnabled style={{ marginTop: 12, }} contentContainerStyle={{ paddingBottom: 4 }}>
                        <Text style={{ color: "#000" }}>The customer is very important, the customer will be followed by the customer.
                            Tomorrow he will not trigger, for easy targets. There's no need to worry about chocolate, except that it's an airline.
                            The product was targeted. There is no gate of easy laughter. Some mass wisdom, flatters and employees and,
                            developers not from. I always put myself in a position where I am pregnant. The children of the children of the land were not even the CNN,
                            the hendrerit urna rutrum suscepti. The fear of the great smile, the chocolate from the protein's throat, let the yeast be the bread.
                            Until the pregnant lacinia will invest in the football field. For the door is afraid of the consequences of time. It's flattering,
                            it's a wise time to prepare, it's a great augury, and it needs a little bit of land. But now there is no investment unless a quiver is made.
                            Everyone's makeup is worth the price</Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>);
    setModalView(modalContent)
}

const renderItem = ({ item }, url, setData, setModalView, lastPurchases) => {
    lastPurchases = lastPurchases ? lastPurchases : {}
    const difference = (item.maxi_price - lastPurchases[item._id]) * 100
    const divisor = lastPurchases[item._id]
    return (
        <Swipeable
            renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item, setData)}
            overshootLeft={false}
        >
            <Pressable style={{ height: 58, paddingLeft: 18, flexDirection: "row", alignItems: "center", backgroundColor: "#fafef9", }} onPress={() => renderModal({ item, url, setModalView })}>
                {/* <Image source={sss} resizeMode="cover" style={{width: 45, height: 45}}/> */}
                <Image source={{ uri: `${url}/${item?.img}` }} resizeMode="cover" style={{ width: 45, height: 45 }} />
                <View style={{ width: "80%", height: "72%", flexDirection: "column", justifyContent: "center", marginStart: 8, paddingRight: 0 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#222", fontSize: 16 }}>{item?.name}</Text>
                        <Text style={{ color: "#222", fontSize: 16 }}>₦{item?.maxi_price}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#888" }}>{item?.category}</Text>
                        <Text style={{ color: difference <= 0 ? "#28a745" : "#dc3545", paddingLeft: "auto" }}>{difference > 0 ? '+' : ''}{isNaN(difference / divisor) ? <Text style={{color: "#444"}}>0.00%</Text> : (difference / divisor).toFixed(2) + "%"}</Text>
                    </View>
                </View>
            </Pressable>
        </Swipeable>
    );
};

export default function CropsInSeason() {
    const { data, setData, url, lastPurchases } = useContext(Context);
    const [modalView, setModalView] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIndicator((prev) => (!prev));
        }, 15000);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    return (
        <>
            {modalView}
            <FlatList
                data={data}
                renderItem={(item) => renderItem(item, url, setData, setModalView, lastPurchases)}
                keyExtractor={(item) => item?._id?.toString() + Math.random() + Math.random()}
                ListEmptyComponent={() => {
                    return showIndicator ? (
                        <View style={{ marginTop: 140 }}>
                            <ActivityIndicator size={56} color="#ffa500" />
                        </View>
                    ) : <Text style={{ color: "#888", alignSelf: "center" }}>An error occured</Text>
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    leftAction: {
        backgroundColor: "#fafef9",
        justifyContent: 'center',
    },
    actionView: {
        color: 'white',
        fontWeight: '600',
        paddingHorizontal: 20,
    },
    checkState: {
        width: 20,
        height: 20,
        borderColor: '#888',
        borderWidth: 4,
        borderRadius: 10,
    },
    modalText: {
        color: "#222",
        marginTop: 4
    }
});


