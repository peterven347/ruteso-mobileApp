import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, FlatList, Screen, StyleSheet, Text, View } from 'react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

import { Context } from "../../Squarepay"


export default function CartView({ cart, expense }) {
    let paymentIntentIdd = 999;
    // const url = "http://192.168.22.189:27017"
    // const { token } = useContext(Context)
    const { url, token } = useContext(Context)
    const saveOrder = async () => {
        const options = {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify([...cart, { paymentIntentIdd }])
        }
        const cost = await fetch(`${url}/order`, options)
        const { costVal } = await cost.json()
        console.log(costVal)

    };

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${url}/payment-sheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart)
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();
        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "squarepp",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            saveOrder()
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };


    const renderCart = ({ item }) => (
        <View style={{ backgroundColor: "orange", margin: 2 }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "500", maxWidth: "25%" }}>{item.name}</Text>
        </View>
    );

    return (
        <>
            <Text style={{ color: "black", fontSize: 14, marginTop: 4 }}>Expense: ₦{expense}</Text>
            <FlatList data={cart} renderItem={renderCart} keyExtractor={(item) => item._id} />
            <Button
                // variant="primary"
                disabled={!loading}
                title="Checkout"
                onPress={() => { openPaymentSheet(); }}
            />
        </>
    )
}