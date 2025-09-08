import { howToCreateEvent } from "@/assets/local-data/how-to-create-event";
import { schools } from "@/assets/local-data/school-list";
import { themeColors } from "@/utils/theme.utils";
import { useEffect, useState } from "react";
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity,
    ActivityIndicator, View, 
    Alert} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { db } from "@/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";


// get id of event
// perform getDoc
// set doc data to useState
// perform updateDoc


export default function UpdateEvent () {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [venue,setVenue] = useState("");
    const [imageUrl,setImageUrl] = useState("");
    const [fee,setFee] = useState("");
    const [schoolOptions,setSchoolOptions] = useState([]);
    const [selectedSchool,setSelectedSchool] = useState(null);
    const [date,setDate] = useState(new Date());
    const [showPicker,setShowPicker] = useState(false);
    const [loading,setLoading] = useState(false);

    console.log(date, ">>>>>>>>>>")

    const handleCreateEvent = async () => {
        setLoading(true)
        try {
           const docRef = addDoc(collection(db,"events"), {
            title: title,
            desc: description,
            venue: venue,
            school: selectedSchool,
            date: "",
            createdBy: "anonymous",
            createdAt: new Date().getTime(),
            imgUrl: imageUrl,
            fee: fee
            
        });
        setLoading(false);

        Alert.alert(
            "Alert",
            "Your event was successfully created",
            [
                {text: "Okay"},
                {text: "Return to feeds",
                    onPress: () => console.log("to be implemented")
                }
            ]
        )
            // clear input data
            setDate("");
            setTitle("");
            setVenue("");
            setDescription("");
            setFee("");
            setImageUrl("");
        } catch (error) {
            console.log("An error was encountered",error)
            setLoading(false)
        }
       
    }
    // make a simple list of schools
    useEffect(() => {
        const list = [];
        schools.forEach(item => list.push({
            label: item.title,
            value: item.symbol
        }));
        setSchoolOptions(list);
    },[]);

    const onChange = (event,selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShowPicker(false);
    }

    return (
        <View style={styles.main}>
            <Text className="text-black text-4xl font-bold">Create an event</Text>

            <ScrollView contentContainerStyle={{gap: 16}}>
                {/* event creation form */}
                <View className="flex gap-4 bg-white rounded-md p-3">
                    <View>
                        <Text className="text-md text-neutral-500">Event title</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="title of your event"
                        value={title}
                        onChangeText={(text) => setTitle(text)}/>
                    </View>
                    
                    <View>
                        <Text className="text-md text-neutral-500">Event description</Text>
                        <TextInput
                        multiline={true}
                        style={styles.input}
                        placeholder="title of your event"
                        value={description}
                        onChangeText={(text) => setDescription(text)}/>
                    </View>

                    <View>
                        <Text className="text-md text-neutral-500">What is the fee for this event?</Text>
                        <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        placeholder="fee in Naira"
                        value={fee}
                        onChangeText={(text) => setFee(text)}/>
                    </View>

                    <View>
                        <Text className="text-md text-neutral-500">Image address</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="image link address"
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}/>
                    </View>

                    {/* <View>
                        <TouchableOpacity 
                        onPress={() => setShowPicker(true)}
                        style={styles.picker}
                        className="flex flex-row justify-between items-center">
                            <Text className="font-bold text-lg text-neutral-100">{formatTimestampToDate(date)}</Text>
                            <Text className="font-bold text-2xl text-neutral-100">Select event date</Text>
                        </TouchableOpacity>
                        {showPicker && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            mode="date"
                            value={date}
                            onChange={onChange}/>
                        )}
                    </View> */}

                    <View>
                        <Text className="text-md text-neutral-500">Event venue</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="exact event venue"
                        value={venue}
                        onChangeText={(text) => setVenue(text)}/>
                    </View>
                    
                    {schoolOptions.length > 0 &&
                    <View style={styles.input}>
                        <Text>Choose school where event will be held</Text>
                        <RNPickerSelect
                        items={schoolOptions} // requires an object with label an value
                        onValueChange={(item) => setSelectedSchool(item)}
                        value={selectedSchool}/>
                    </View>}

                    <TouchableOpacity
                    onPress={title.length > 6 && 
                        description.length > 3 && 
                        imageUrl.length > 8
                         ? handleCreateEvent : () => {}
                        }
                    style={styles.submitBtn}>
                        {loading === true
                        ?
                        <ActivityIndicator size="large" color="white"/>
                        :
                        <Text style={styles.btnText}>Create event</Text>
                    }
                    </TouchableOpacity>
                </View>

                {/* how to create event - documentation */}
                <View className="flex gap-4 bg-white rounded-md p-3">
                    {howToCreateEvent.map(item => (
                        <View key={item.title}>
                            <Text className="font-bold">{item.title}</Text>
                            <Text className="text-neutral-700">{item.doc}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        gap: 16,
        paddingTop: Platform.OS === "ios" ? 24 : StatusBar.currentHeight,
        paddingHorizontal: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: themeColors.gray300,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        fontSize: 16,
    },
    picker: {
        backgroundColor: themeColors.darkGray,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    submitBtn: {
        height: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        backgroundColor: "brown",
        borderRadius: 16
    },
    btnText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold"

    }
})