import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { useGetUsersQuery } from '../services/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addItem } from '../features/localListSlice';

export default function HomeScreen() {
    const { data: apiList, error, isLoading } = useGetUsersQuery();
    const localList = useSelector((state: RootState) => state.localList.items);
    const dispatch = useDispatch();

    const [newItem, setNewItem] = React.useState('');

    const handleAddItem = () => {
        if (newItem) {
            dispatch(addItem(newItem));
            setNewItem('');
        }
    };

    if (isLoading) {
        return <ActivityIndicator />;
    }
    console.log('error', error)
    if (error) return <Text>Error loading data</Text>;


    // API'den gelen ve yerel listeyi birleştiriyoruz
    /* const combinedList = [...(apiList || []), ...localList]; */




    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                /* data={combinedList} */
                data={apiList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text>id: {item.id}</Text>
                        <Text>name: {item.name}</Text>
                        <Text>phone: {item.phone}</Text>
                        <Text>email: {item.email}</Text>
                    </View>)}
            />

            {/*  <TextInput
                placeholder="Add new item"
                value={newItem}
                onChangeText={setNewItem}
                style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
            />
            <Button title="Add Item" onPress={handleAddItem} /> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 5,
        paddingHorizontal: 18,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        gap: 2
    },
});
