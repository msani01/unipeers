import { events } from "@/assets/local-data/events";
import { themeColors } from "@/utils/theme.utils";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Text, View, FlatList, Image, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign"

// Calculate Screen Width
const screenWidth = Dimensions.get("window").width;

function Separator () {
    return (
        <View style={{height:32, backgroundColor:"transparent"}}></View>
    )
}


export default function Index () {
    return (

       <SafeAreaProvider>
        <SafeAreaView style={{
            flex: 1
        }}>
           <FlatList
           data={events}
           ItemSeparatorComponent={Separator}
           renderItem={({item}) => {
            return (
                <View className="relative">
                    <Image
                    source={{uri: item.bannerUrl}}
                    alt="event photo"
                    style={{width:screenWidth,height:400,resizeMode:"cover"}}/>

                    {/* this view is set to absolute on event component */}
                    <View className="p-3 absolute top-3 left-3 bg-teal-800 rounded-md">
                        {item.free === true 
                        ?
                        <Text className="text-white font-bold">Free</Text>
                        :
                        <Text className="text-white font-bold">₦{item.fee}</Text> }
                    </View>
                    <View className="px-3">
                        <View className="p-3 rounded-b-md border border-teal-600 border-t-0" >
                            <Text className="text-xs font-bold">{item.title}</Text>
                            <View className="flex flex-row justify-between">
                                <View className="flex flex-row items-center gap-x-2 ">
                                    <FontAwesome name="user-circle" size={24} color={"black"}/>
                                    <Text>{item.createdBy}</Text>
                                </View>
                                <Link href="/profile" className="p-3 font-bold text-white bg-teal-800 rounded-md">
                                    <Text>Event details</Text>
                                    
                                </Link>
                            </View>
                        </View>

                    </View>
                </View>
            )
           }}
           keyExtractor={(item) => item.id}/>
        </SafeAreaView>
       </SafeAreaProvider>
    )
}