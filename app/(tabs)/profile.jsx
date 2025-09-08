import { Link } from "expo-router";
import { View,Text, Image, Pressable, Dimensions, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { db } from "@/config/firebase.config";
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Seperator } from "@/components/ListSeparator";
import { UserEventSnippet } from "@/components/UserEventSnippet";

// 24 is used for padding, 16 for gap, 4 is meant for unccountable spaces
const screenwidth = Dimensions.get("window").width - 24  - 16 - 4;
export default function Profile () {
    let user = "anonymous";
    const [userEvents,setUserEvents] = useState([]);

    useEffect(() => {
        const handleFetchUserEvents = async () => {
            const reData = []; // compile fetched data here 
            const q = query(
                collection(db, "events"),
                where("createdBy", "==", user)
            );
            
            onSnapshot(q, (onSnap) => {
                onSnap.docs.forEach((doc) => reData.push({
                    id: doc.id,
                    data: doc.data()
                }));
                setUserEvents(reData)
            });

            
        }

        // call and execute
        handleFetchUserEvents()
    },[user]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{paddingHorizontal: 12}} className="flex gap-6">
                {/* header section */}
                <View className="flex items-center">
                    <Image
                    style={{width: 86, height: 86}}
                    source={require("../../assets/images/user.png")}
                    alt="demo user profile picture"
                    />
                    <Text className="font-bold">Ademola Suleiman</Text>
                    <Text className="text-stone-600 tracking-widest">@adesule</Text>

                    {/* profile actions */}
                    <View className="flex flex-row gap-6 items-center mt-3 ">
                        <Link href="/" className="flex flex-row items-center px-3 py-2 rounded-md bg-teal-700 ">
                            <View className="flex flex-row items-center gap-3">
                                <FontAwesome name="pencil-square-o" size={24} color={"white"}/>
                                <Text className="text-lg font-semibold text-white">Update Profile</Text>
                            </View>
                        </Link>
                        <Pressable className="flex flex-row items-center px-3 py-2 rounded-md bg-red-700 gap-3 ">
                            <MaterialIcons name="logout" size={24} color={"white"}/>
                            <Text className="text-lg font-semibold text-white">Sign Out</Text>
                        </Pressable>
                    
                    </View>
                </View>

                {/* body section */}
                 <View className="flex gap-3 border border-stone-300 rounded-md p-4 "> {/* parent view */}
                    <View className="flex flex-row justify-between items ">
                        <Text className="text-lg text-stone-700 tracking-wider">Account Email</Text>
                        <Text className="text-md text-stone-800">ademola_sule@gmail.com</Text>
                    </View>
                    <View className="flex flex-row justify-between items ">
                        <Text className="text-lg text-stone-700 tracking-wider">Department</Text>
                        <Text className="text-md text-stone-800">Computer Engineering</Text>
                    </View>
                    <View className="flex flex-row justify-between items ">
                        <Text className="text-lg text-stone-700 tracking-wider">Faculty</Text>
                        <Text className="text-md text-stone-800">Engineering</Text>
                    </View>
                    <View className="flex flex-row justify-between items ">
                        <Text className="text-lg text-stone-700 tracking-wider">Institution</Text>
                        <Text className="text-md text-stone-800">Ahmadu Bello University, Zaria</Text>
                    </View>
                   
                </View>
            
                {/* show events by the user*/}
                <View >
                    <Text style={{fontSize: 24, marginBottom: 16}}>My Events</Text>
                    <FlatList
                    data={userEvents}
                    renderItem={({item}) => {
                        return (
                            <UserEventSnippet boxWidth={screenwidth/3} eventData={item}/>
                        )
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) =>item.id}
                    ItemSeparatorComponent={() => <Seperator h={0} w={8}/>}
                    />
                    
                </View>                
            </SafeAreaView>
        </SafeAreaProvider>
    )
}