import React from "react";
import { Animated, FlatList, StyleSheet, View, Text } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Third() {
    const rr = ({item}) => {
        return(
        <View style={{backgroundColor: "#f00", height: 48, margin: 8}}>
          <Text style={{color: "black"}}>{item.a}</Text>
        </View>
        )
    }
  return (
        <FlatList
            data={[{a:1}, {a:2}]}
            renderItem={rr}
        />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});



// import React from "react";
// import { Animated, StyleSheet, View, Text } from "react-native";
// import { RectButton } from "react-native-gesture-handler";
// import Swipeable from "react-native-gesture-handler/Swipeable";

// const Third = () => {
//   const renderLeftActions = (progress, dragX) => {
//     const trans = dragX.interpolate({
//       inputRange: [0, 50, 51, 101],
//       outputRange: [-20, 0, 0, 1],
//     });
//     const opacity = progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 1],
//     })

//     return (
//       <RectButton
//       style={styles.leftAction}
//       onPress={() => { /* Add your close logic here */ }}>
//         <Animated.View
//           style={[
//             styles.actionView,
//             {
//               transform: [{ translateX: trans }],
//               opacity: opacity
//             },
//           ]}
//         >
//             <View
//                 style={styles.checkState}
//                 onStartShouldSetResponder={() => {
//                     // toggleItemSelection(item._id);
//                 }}
//                 >
//             </View>
//         </Animated.View>
//       </RectButton>
//     );
//   };

//   return (
//     <Swipeable
//       renderLeftActions={renderLeftActions}
//       overshootLeft={false}
//     >
//       <View style={{height: 48, backgroundColor: "#fafef9"}}>
//         <Text style={{color: "#444"}}>
//           Peterven
//         </Text>
//       </View>
//     </Swipeable>
//   );
// };

// const styles = StyleSheet.create({
//   leftAction: {
//     backgroundColor: "#ccc",
//     justifyContent: 'center',
//   },
//   actionView: {
//     color: 'white',
//     fontWeight: '600',
//     paddingHorizontal: 20,
//   },
//   checkState: {
//       width: 20,
//       height: 20,
//       backgroundColor: "#cyan",
//       borderColor: '#888',
//       borderWidth: 4,
//       borderRadius: 10,
//   }
// });

// export default Third;
