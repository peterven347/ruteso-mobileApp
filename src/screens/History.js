import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HistoryModal from './HistoryModal';
import { Context } from '../../Squarepay';
import { Button } from 'react-native-paper';

const renderModal = ({item, setModalView}) => {
    if (item.date == item.date) {
        let modalContent = (
            <Modal animationType="fade" onRequestClose={() => setModalView(null)}>
                <Text style={{ color: "#222" }}>{new Date(item.date).toDateString()}</Text>
                <HistoryModal history={item.orders} />
            </Modal>);
        setModalView(modalContent)
    }
}

const renderItem = ({ item, setModalView }) => {
    // let date = new Date(Date.now()).toUTCString()
    // let time = date.split(' ').slice(4, 5).join(' ');
    // date = date.split(' ').slice(1, 4).join(' ');

    let expenseArray = Array.isArray(item?.orders) 
    ? item.orders.flat().filter(i => i?.hasOwnProperty("Total_Cost")) 
    : [];
  
    let total_expense = expenseArray?.reduce((acc, i) => {
        return acc + i.Total_Cost
    }, 0);
    return (
        <>
            <View style={styles.renderitem}>
                <View>
                    <Text style={{ fontSize: 16, color: "#000" }}>{item.date}</Text>
                    <View style={{ height: 14 }}></View>
                    {/* <Text style={{ color: item.state === "successful" ? "#0f0" : "#f00" }}>{"successful"}</Text> */}
                    <Text style={{ color: total_expense == 152 ? "#f00" : "#00cc00" }}>{total_expense == 152 ? "failed" : "completed"}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 16, color: "#000" }}>{'₦' + total_expense}</Text>
                    <View style={{ height: 14 }}></View>
                    <TouchableOpacity onPress={() => { renderModal({item, setModalView}); }}>
                        <Text style={{ color: "#888" }}>Details {">"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default function History ({history, historyArray, fetchHistory}){
    const [showIndicator, setShowIndicator] = useState(true);
    const [modalView, setModalView] = useState(null)

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowIndicator((prev) => (!prev));
      }, 15000);  
      return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <View>{modalView}</View>
            <View style={styles.history}>
                <FlatList
                    data={historyArray}
                    renderItem={(props) => renderItem({...props, setModalView})}
                    onRefresh={() => {
                        fetchHistory()
                    }}
                    refreshing={!history}
                    keyExtractor={(item) => item.date}
                    style={{ paddingBottom: 2 }}
                    ListEmptyComponent={ () => {
                        return showIndicator? (
                            <View style={{ marginTop: 140 }}>
                                <ActivityIndicator size={56} color="#ffa500" />
                            </View>
                        ) : <Text style={{color: "#888", alignSelf: "center"}}>An error occured</Text>
                    }}
                />
            </View>
            </>
)}

const styles = StyleSheet.create({
    history: {
        // width: "98%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "space-between",
        color: "#444",
    },
    renderitem: {
        width: "100%",
        height: "auto",
        paddingVertical: 2,
        paddingLeft: "2%",
        paddingRight: "4%",
        marginBottom: 2,
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between",
        color: "#444",
        backgroundColor: "#fafef9"
    },
})