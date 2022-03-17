import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({ 
    name:"order",
    initialState:{
        orders: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        // GET ALL
        getOrderStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getOrderSuccess: (state, action) => {
            state.isFetching = false
            state.orders = action.payload;
        },
        getOrderFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        // DELETE
        deleteOrderStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteOrderSuccess: (state, action) => {
            state.isFetching = false
            state.orders.splice(
                state.orders.findIndex(item => item._id === action.payload), 1
            )

        },
        deleteOrderFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        // UPDATE
        updateProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false
            state.products[state.products.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.product;


        },
        updateProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        // CREATE
        addProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false
            state.products.push(action.payload);


        },
        addProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }

})

export const { getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailure,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailure,
    addOrderStart,
    addOrderSuccess,
    addOrderFailure, } = orderSlice.actions;
export default orderSlice.reducer;
