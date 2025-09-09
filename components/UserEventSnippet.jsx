import { Image, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { themeColors } from "@/utils/theme.utils";
import { db } from "@/config/firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";

export function UserEventSnippet ({ eventData,boxWidth}) {
    const [isLoading,setIsLoading] = useState(false);
    const [data,setData] = useState(undefined);

    useEffect(() => {
        setData(eventData)
    },[eventData])

    const handleDeleteEvent = async () => {
        setIsLoading(true);
        try {
            await deleteDoc(doc(db,"events",data.id));
             Alert.alert("Success",
                "Event deleted!",
                [{text: "Okay"}]
            );
            setIsLoading(false);
            setData(undefined) // in order to force component to reload
        }
         catch (error) {
            Alert.alert("Error",
                "Action could not be completed",
                [{text: "Dismiss"}]
            );
            console.log("Error",error);
            setIsLoading(false);
        }
    }

    if (data !== undefined) {
        return( 
            <View style={{
                position: "relative",
                width: boxWidth,
                height: 160,
                borderRadius: 8
            }}>
                <Image 
                style={{
                    width: boxWidth,
                    height: 160,
                    borderRadius: 8, 
                    resizeMode: "cover"
                }}
                source={{ uri: data.data.imgUrl }}/>

                <View style={styles.ctaBlock}>
                <TouchableOpacity 
                onPress={handleDeleteEvent}
                style={styles.ctaBorder}>
                    {isLoading
                        ?
                        <ActivityIndicator size="small" color="black"/>
                        :
                    <Feather name="trash-2" size={24} color="black"/>}
                </TouchableOpacity>
                <Link
                    href={{
                        pathname: "/update-event/[uid]",
                        params: { uid: data.id }, // ✅ Pass the correct Firestore doc ID
                    }}
                    >
                    <View style={styles.ctaBorder}>
                        <Feather name="edit" size={24} color="black" />
                    </View>
                </Link>

                </View>
            </View>
            )
        }

}

const styles = StyleSheet.create({
ctaBlock: {
    position: "absolute",
    bottom: 4,
    right: 4,
    display: "flex",
    flexDirection: "row",
    gap: 10,

},
ctaBorder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    width: 32,
    borderRadius: 50,
    backgroundColor: themeColors.lightGreen
}
});