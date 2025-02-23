import { createSlice } from '@reduxjs/toolkit'

const youapp = createSlice({
    name: 'youapp',
    initialState: {
        data: {}
    },
    reducers: {
        storeData: () => { 
            
        }
    }
})

export const {
    storeData
} = youapp.actions

export default youapp.reducer