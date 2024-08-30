import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ion from "react-native-vector-icons/Ionicons";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';

import { Context } from "../../Squarepay"
import { Deposit, Send, Season, Pending } from "./HomeDashboardTabs";
import History from "./History"
import CropsInSeason from "./CropsInSeason"
import Third from "./Third"

const Stack = createNativeStackNavigator()

function MainComp(props) {
    return (
        <TouchableOpacity style={{ alignItems: "center", justifyContent: "space-around" }}>
            <View style={{ backgroundColor: "#fafef9", borderRadius: 50 }}>
                <props.Icon name={props.icon} size={32} color="#ffa500" onPress={() => { props.navigateto() }} />
            </View>
            <Text style={{ color: "#fafef9" }}>{props.name}</Text>
        </TouchableOpacity>
    )
}

const renderTabBar = props => (
    <TabBar
        {...props}
        pressColor="#ffc14f"
        indicatorStyle={{ backgroundColor: "#ffa500" }}
        style={{ backgroundColor: "#eee" }}
        labelStyle={{ color: "#222" }}
        renderLabel={({ route, focused, color }) => (
            <Text style={{ color, margin: 8 }}>
                {route.title}
            </Text>
        )}
    />
);

function Dashboard({ navigation }) {
    const { userName, url, token } = useContext(Context)
    const layout = useWindowDimensions();
    const name = userName.charAt(0).toUpperCase() + userName.slice(1)
    const [index, setIndex] = useState(0);
    const [modalView, setModalView] = useState(null)
    const [balVisible, setBalVisible] = useState(false)
    const [history, setHistory] = useState({
        // "Fri Apr 05 2027": [
        //     [
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "Total_Cost": 93,
        //             // "state"
        //         }
        //     ],
        //     [
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "Total_Cost": 44
        //         },
        //         {
        //             "state": "completed"
        //         }
        //     ],
        //     [
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "Total_Cost": 44
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "cereal",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "cereal",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 10
        //         }
        //     ]
        // ],
        // "Wed Apr 01 2027": [
        //     [
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 49
        //         }
        //     ],
        //     [
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 49
        //         }
        //     ]
        // ],
        // "Thurs Apr 02 2027": [
        //     [
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 49
        //         }
        //     ],
        //     [
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 49
        //         }
        //     ],
        //     [
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 54
        //         }
        //     ]
        // ],
        // "Tue May 07 2027": [
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "Total_Cost": 49
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 54
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 54
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 54
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 54
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 54
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 54
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "cereal",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "cereal",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 59
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "cereal",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "cereal",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 59
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "cereal",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "cereal",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 59
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "cereal",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "cereal",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 59
        //         }
        //     ],
        //     [
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "name": "cereal",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "cereal",
        //             "cost": 5
        //         },
        //         {
        //             "name": "dsssxd",
        //             "mini_unit": "litre",
        //             "mini_price": 44,
        //             "mini_quantity": 1,
        //             "maxi_unit": "litre",
        //             "maxi_price": 54,
        //             "maxi_quantity": 0,
        //             "category": "tuber",
        //             "cost": 44
        //         },
        //         {
        //             "name": "ann",
        //             "mini_unit": "ann",
        //             "mini_price": 5,
        //             "mini_quantity": 1,
        //             "maxi_unit": "ann",
        //             "maxi_price": 5,
        //             "maxi_quantity": 0,
        //             "category": "ann",
        //             "cost": 5
        //         },
        //         {
        //             "Total_Cost": 59
        //         }
        //     ]
        // ]
    })
    let historyArray = Object.entries(history).map(([date, orders]) => ({
        date,
        orders
    }));
    const fetchHistory = async () => {
        try {
            const history = await fetch(`${url}/history`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            const jsonresult = await history.json()
            setHistory(jsonresult)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchHistory()
    }, [])

    function navigateScr(screen) {
        navigation.navigate(screen)
    }

    const [routes] = useState([
        { key: 'second', title: 'Crops in Season' },
        { key: 'third', title: 'test'},
        { key: 'first', title: 'History' },
    ]);

    return (
        <>
            <View>{modalView}</View>
            <View style={styles.topView}>
                <Text style={{ fontWeight: "bold", fontSize: 16, color: "#444" }}>Hello, P{name.toUpperCase()}TER</Text>
                {/* <Text style={{ fontWeight: "bold", fontSize: 16, color: "#444" }}>Hello, {name.toUpperCase()}</Text> */}
                <TouchableOpacity>
                    {/* <View></View> */}
                    <Ion name="notifications" size={20} color="#444" />
                    <View style={{ width: 16, height: 16, borderRadius: 50, backgroundColor: "#eee", position: "relative", top: -28, left: 12 }}>
                        <Text style={{ color: "#f55", fontSize: 13, fontWeight: "bold", alignSelf: "center", paddingEnd: 4, paddingTop:2 }}>{9}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.balance}>
                <Text style={{ minWidth: 118, color: "#222" }}>Balance: {balVisible ? "9,000,000" : "****"}</Text>
                <TouchableOpacity>
                    <Mci name={balVisible ? "eye-off" : "eye"} size={20} color="#444" onPress={() => setBalVisible((prev) => (!prev))} />
                </TouchableOpacity>
            </View>
            <View style={{ width: "98%", height: 80, flexDirection: "row", alignSelf: "center", justifyContent: "space-evenly", backgroundColor: "#ffa500" }}>
                <MainComp Icon={Mci} icon="arrow-bottom-left-thin" name="Deposit" navigateto={() => navigateScr("Deposit")} />
                <MainComp Icon={Mci} icon="arrow-top-right-thin" name="Send" navigateto={() => navigateScr("Send")} />
                <MainComp Icon={Mci} icon="timer-sand" name="Pending" navigateto={() => navigateScr("Pending")} />
                <MainComp Icon={Mci} icon="history" name="Season" navigateto={() => navigateScr("Season")} />
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap({
                    first: () => <History history={history} historyArray={historyArray} fetchHistory={fetchHistory} setModalView={setModalView}/>,
                    second: () => <CropsInSeason/>,
                    third: () => <Third/>
                })}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </>
    )
}


export default function Home() {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Deposit" component={Deposit} />
                <Stack.Screen name="Send" component={Send} />
                <Stack.Screen name="Season" component={Season} />
                <Stack.Screen name="Pending" component={Pending} />
            </Stack.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    topView: {
        width: "98%",
        marginTop: 2,
        marginBottom: 14,
        paddingRight: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        color: "#444"
    },
    balance: {
        width: "98%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        color: "#444"
    },
})