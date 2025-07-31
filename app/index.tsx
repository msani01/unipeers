import { customStyles } from "@/components/custom-styles";
import { Image, StyleSheet, Text, View } from "react-native";

export default  function Index() {
  return (
    <View style={customStyles.main}>
      <View >
        <Text style={{
          fontWeight: "bold", 
          color: "gray", 
          fontSize:24
          }}>React Native Training</Text>
      </View>

      <View style={{
        width: "100%",
        minHeight: 160,
        backgroundColor: "black"
      }}>
        <Text style={styles.text}>Course Banner</Text>
        <Image
        height={140}
        width={280}
        style={{
          width:"100%"
        }}
        source={{uri: "https://www.earlycode.net/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Feaco-89ea2.appspot.com%2Fo%2Fcourses%252FKp5SLBxj9jDKtlE7DLBQ%252Fandroid_and_ios_development.png%3Falt%3Dmedia%26token%3D23d28bee-9d9f-4935-8665-b3e9e8257c32&w=828&q=75"}}
        alt="course photo"/>
      </View>

      <View style={{
        width: "100%",
        minHeight: 160,
        backgroundColor: "orange",
        marginVertical:16,
        borderWidth: 4,
        borderColor: "black",
        borderRadius: 12
      }}>
        <Text style={styles.text}>About Me</Text>
      </View>

      <View style={{
        width: "100%",
        minHeight: 160,
        backgroundColor: "purple"
      }}>
        <Text style={styles.text}>About Early Code Intitute</Text>
        <Image
        source={require("../assets/images/react-logo.png")}
        alt="logo"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "white"
  }
})