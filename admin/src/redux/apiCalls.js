import {
    loginStart,
    loginFailure,
    loginSuccess,
    getUserStart,
    getUserSuccess,
    getUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
} from "./productRedux";
import {
    getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailure,
} from "./orderRedux"; 



export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
}

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        // const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
}

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        // update
        const res = await userRequest.put(`/products/${id}`, product);

        dispatch(updateProductSuccess(id, res.data));
    } catch (err) {
        dispatch(updateProductFailure());
    }
}

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/products`, product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
}



export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await userRequest.get("/users");
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailure());
    }
}

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        // const res = await userRequest.delete(`/s/${id}`);
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
}

export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
        // update
        const res = await userRequest.put(`/users/${id}`, user);

        dispatch(updateUserSuccess(id, res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
}

export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await userRequest.post(`/users`, user);
        dispatch(addUserSuccess(res.data));
    } catch (err) {
        dispatch(addUserFailure());
    }
}
// GET ORDERS
export const getOrders = async (dispatch) => {
    dispatch(getOrderStart());
    try {
        const res = await userRequest.get("/orders");
        dispatch(getOrderSuccess(res.data));
    } catch (err) {
        dispatch(getOrderFailure());
    }
}

export const deleteOrder = async (id, dispatch) => {
    dispatch(deleteOrderStart());
    try {
        // const res = await userRequest.delete(`/s/${id}`);
        dispatch(deleteOrderSuccess(id));
    } catch (err) {
        dispatch(deleteOrderFailure());
    }
}
