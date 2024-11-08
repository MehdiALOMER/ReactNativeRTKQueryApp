import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocalListState {
    items: string[];
}

const initialState: LocalListState = {
    items: [], // Başlangıçta boş bir liste
};

const localListSlice = createSlice({
    name: 'localList',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<string>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items.splice(action.payload, 1);
        },
    },
});

export const { addItem, removeItem } = localListSlice.actions;
export default localListSlice.reducer;
