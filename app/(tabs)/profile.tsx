import { Link } from "expo-router";
import { View,Text, Image, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Profile () {
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
                    <View className="flex flex-row justify-between items ">
                        <Text className="text-lg text-stone-700 tracking-wider">Events</Text>
                        <Link href="/" className="px-3 py-2 rounded-md bg-teal-700 text-teal-100">Go to events</Link>
                    </View>
                </View>

                {/* buttom section */}
                <View className="flex flex-row gap-6 items-center ">
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
            </SafeAreaView>
        </SafeAreaProvider>
    )
}