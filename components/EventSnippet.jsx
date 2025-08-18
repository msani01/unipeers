import { View,Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { themeColors } from "@/utils/theme.utils";



export function EventSnippet ({ mainTitle,subTitle,iconName}) {
    return (
    <View className="w-full flex flex-row gap-x-8 ">
        <MaterialIcons name={iconName} size={36} style={{color: themeColors.darkGreen}}/>
        <View>
            <Text style={{color: themeColors.darkGreen,fontWeight:"bold"}}>{mainTitle}</Text>
            <Text>{subTitle}</Text>
        </View>
    </View>
    )
}