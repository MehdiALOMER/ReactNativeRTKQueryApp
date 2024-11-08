import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from './store';

export default function Layout() {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="index" options={{ title: 'Home' }} />
                <Stack.Screen name="screens/HomeScreen" options={{ title: 'Home Screen' }} />
            </Stack>
        </Provider>
    );
}
