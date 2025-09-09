import { howToCreateEvent } from "@/assets/local-data/how-to-create-event";
import { schools } from "@/assets/local-data/school-list";
import { themeColors } from "@/utils/theme.utils";
import { useEffect, useState } from "react";
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    View,
    Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { db } from "@/config/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useLocalSearchParams, useRouter } from "expo-router"; 

export default function UpdateEvent() {
    const { uid } = useLocalSearchParams(); // ✅ get dynamic param

    console.log("Event UID:", uid); // 🟢 Debugging line
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [venue, setVenue] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [fee, setFee] = useState("");
    const [schoolOptions, setSchoolOptions] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    // ✅ fetch event details safely
    useEffect(() => {
        const fetchEvent = async () => {
            if (!uid) return; // avoid calling Firestore with undefined uid

            try {
                setLoading(false);
                const docRef = doc(db, "events", uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.title );
                    setDescription(data.desc );
                    setVenue(data.venue );
                    setImageUrl(data.imgUrl );
                    setFee(data.fee );
                    setSelectedSchool(data.school);
                    setDate(data.date ? new Date(data.date) : new Date());
                } else {
                    Alert.alert("Error", "Event not found!");
                }
            } catch (error) {
                console.error("Error fetching event:", error);
                Alert.alert("Error", "Failed to fetch event data.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [uid]);

    // ✅ Update event in Firestore
    const handleUpdateEvent = async () => {
        if (!title || !description || !venue || !selectedSchool) {
            Alert.alert("Validation Error", "Please fill all required fields.");
            return;
        }

        try {
            setLoading(true);
            const docRef = doc(db, "events", uid);
            await updateDoc(docRef, {
                title,
                desc: description,
                venue,
                school: selectedSchool,
                date: date.getTime(),
                imgUrl: imageUrl,
                fee,
                updatedAt: new Date().getTime(),
            });

            setLoading(false);
            Alert.alert("Success", "Event updated successfully!", [
                {
                    text: "OK",
                    onPress: () => router.back(), // ✅ navigate back after update
                },
            ]);
        } catch (error) {
            console.error("Error updating event:", error);
            Alert.alert("Error", "Failed to update event.");
            setLoading(false);
        }
    };

    // ✅ Populate school list
    useEffect(() => {
        const list = schools.map(item => ({
            label: item.title,
            value: item.symbol,
        }));
        setSchoolOptions(list);
    }, []);

    return (
        <View style={styles.main}>
            <Text className="text-black text-4xl font-bold">Update Event</Text>

            <ScrollView contentContainerStyle={{ gap: 16 }}>
                <View className="flex gap-4 bg-white rounded-md p-3">
                    <View>
                        <Text className="text-md text-neutral-500">Event title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title of your event"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <View>
                        <Text className="text-md text-neutral-500">Event description</Text>
                        <TextInput
                            multiline={true}
                            style={styles.input}
                            placeholder="Description of your event"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    <View>
                        <Text className="text-md text-neutral-500">Event fee</Text>
                        <TextInput
                            keyboardType="numeric"
                            style={styles.input}
                            placeholder="Fee in Naira"
                            value={fee}
                            onChangeText={setFee}
                        />
                    </View>

                    <View>
                        <Text className="text-md text-neutral-500">Image address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Image link"
                            value={imageUrl}
                            onChangeText={setImageUrl}
                        />
                    </View>

                    <View>
                        <Text className="text-md text-neutral-500">Event venue</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Exact event venue"
                            value={venue}
                            onChangeText={setVenue}
                        />
                    </View>

                    {schoolOptions.length > 0 && (
                        <View style={styles.input}>
                            <Text>Choose school where event will be held</Text>
                            <RNPickerSelect
                                items={schoolOptions}
                                onValueChange={setSelectedSchool}
                                value={selectedSchool}
                            />
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={handleUpdateEvent}
                        style={styles.submitBtn}
                    >
                        {loading ? (
                            <ActivityIndicator size="large" color="white" />
                        ) : (
                            <Text style={styles.btnText}>Update Event</Text>
                        )}
                    </TouchableOpacity>
                </View>

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
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
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
    submitBtn: {
        height: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "brown",
        borderRadius: 16,
    },
    btnText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
});
