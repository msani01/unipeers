import { events } from "@/assets/local-data/events";
import { Text, View, FlatList, Image, } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function Separator () {
    return (
        <View style={{height:16, backgroundColor:"transparent"}}></View>
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
           renderItem={({item}) => {
            return (
                <View>
                    <Image
                    source={{uri: item.bannerUrl}}
                    alt="event photo"
                    style={{width:600,height:400,resizeMode:"cover"}}/>
                    <Text className="text-xs font-bold">{item.title}</Text>
                </View>
            )
           }}
           keyExtractor={(item) => item.id}/>
        </SafeAreaView>
       </SafeAreaProvider>
    )
}