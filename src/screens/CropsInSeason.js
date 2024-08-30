import React, { useContext } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { FlatList, RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Context } from '../../Squarepay';

export default function CropsInSeason() {
    const { data, setData } = useContext(Context)
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
        console.log(_id)
    };
    function renderLeftActions(progress, dragX, item){
        const trans = dragX.interpolate({
            inputRange: [0, 50, 51, 101],
            outputRange: [-20, 0, 0, 1],
        });
        const opacity = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        })


        return (
            <RectButton
                style={styles.leftAction}
                onPress={() => { /* Add your close logic here */ }}>
                <Animated.View
                    style={[
                        styles.actionView,
                        {
                            transform: [{ translateX: trans }],
                            opacity: opacity
                        },
                    ]}
                >
                    <View
                        style={styles.checkState}
                        onStartShouldSetResponder={() => {
                            toggleItemSelection(item._id);
                        }}
                    >
                    </View>
                </Animated.View>
            </RectButton>
        );
    };
    const renderItem = ({item}) => {
        return(
            <Swipeable
                renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item)}
                overshootLeft={false}
            >
                <View style={{ height: 48, backgroundColor: "#fafef9", paddingLeft: 4 }}>
                    <Text style={{ color: "#444" }}>
                        {item.name}
                    </Text>
                </View>
            </Swipeable>
        )
    }

  return (
        <FlatList
            data={[{"__v": 0, "_id": "65c2c6dae5fe1365d49bafd7", "category": "tuber", "checkState": false, "cost": 1, "img": "uploads\\images\\1707263706151-IMG-20231207-WA0002.jpg", "initialState": false, "maxi_price": 54, "maxi_quantity": 0, "maxi_unit": "litre", "mini_price": 44, "mini_quantity": 1, "mini_unit": "litre", "name": "dsssxd"}, {"__v": 0, "_id": "65dd30e11ac962fa6549e40e", "category": "ann", "checkState": false, "cost": 1, "img": "uploads\\images\\1708994785093-IMG-20231207-WA0002.jpg", "initialState": false, "maxi_price": 5, "maxi_quantity": 0, "maxi_unit": "ann", "mini_price": 5, "mini_quantity": 1, "mini_unit": "ann", "name": "ann"}, {"__v": 0, "_id": "65e102100909abf144e9aa11", "category": "cereal", "checkState": false, "cost": 1, "img": "uploads\\images\\1709244944028-ruteso.png", "initialState": false, "maxi_price": 5, "maxi_quantity": 0, "maxi_unit": "ann", "mini_price": 5, "mini_quantity": 1, "mini_unit": "ann", "name": "cereal"}, {"__v": 0, "_id": "65f5693eb7b1e350b84e1aed", "category": "tuber", "checkState": false, "cost": 1, "img": "uploads\\images\\1707263706151-IMG-20231207-WA0002.jpg", "initialState": false, "maxi_price": 54, "maxi_quantity": 0, "maxi_unit": "litre", "mini_price": 44, "mini_quantity": 1, "mini_unit": "litre", "name": "dsssxd"}, {"__v": 0, "_id": "65f56962b7b1e350b84e1aee", "category": "tuber", "checkState": false, "cost": 1, "img": "uploads\\images\\1707263706151-IMG-20231207-WA0002.jpg", "initialState": false, "maxi_price": 54, "maxi_quantity": 0, "maxi_unit": "litre", "mini_price": 44, "mini_quantity": 1, "mini_unit": "litre", "name": "dsssxd"}, {"__v": 0, "_id": "6600ee9e7c5dff5cb54bafb4", "category": "ann", "checkState": false, "cost": 1, "img": "uploads\\images\\1711337118503-[000027].jpg", "initialState": false, "maxi_price": 5, "maxi_quantity": 0, "maxi_unit": "ann", "mini_price": 5, "mini_quantity": 1, "mini_unit": "ann", "name": "ann"}, {"__v": 0, "_id": "661da0859c99ba81dc372959", "category": "tuber", "checkState": false, "cost": 1, "img": "uploads\\images\\1713217669798-281997286_411683190963138_46436795948882579_n.jpg", "initialState": false, "maxi_price": 44, "maxi_quantity": 0, "maxi_unit": "carton", "mini_price": 45, "mini_quantity": 1, "mini_unit": "cup", "name": "gfgd"}, {"__v": 0, "_id": "661da23f9c99ba81dc37295c", "category": "tuber", "checkState": false, "cost": 1, "img": "uploads\\images\\1713218111389-8920e0ea01cae299bb9819ea2bc9d5e5.jpg", "initialState": false, "maxi_price": 3435, "maxi_quantity": 0, "maxi_unit": "cup", "mini_price": 443, "mini_quantity": 1, "mini_unit": "cup", "name": "wrtger"}, {"__v": 0, "_id": "667b3c85f93155f5a8c74b32", "category": "ann", "checkState": false, "cost": 1, "img": "uploads\\images\\1719352453159-5ca5c9ea338e4a2e89c15e5800fffa23.jpg", "initialState": false, "maxi_price": 5, "maxi_quantity": 0, "maxi_unit": "ann", "mini_price": 5, "mini_quantity": 1, "mini_unit": "ann", "name": "ann"}]}
            renderItem={renderItem}
        />
  );
};

const styles = StyleSheet.create({
    leftAction: {
        backgroundColor: "#ccc",
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
        backgroundColor: "#cyan",
        borderColor: '#888',
        borderWidth: 4,
        borderRadius: 10,
    }
});
