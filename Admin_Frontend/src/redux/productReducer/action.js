import axios from "axios"
import { ADD_PRODUCT_SUCCESS, ALL_PRODUCTS_SUCCESS, DELETE_PRODUCT_SUCCESS, GET_MY_ALL_PRODUCTS_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./actionTypes"


//ADD_NEW_PRODUCT
export const addProduct = (payload) => async (dispatch) => {
    dispatch({ type: PRODUCT_REQUEST })
    try {
        let res = await axios.post("https://admin-dashborard-node-backend.onrender.com/api/v1/products/newProduct", payload, {
            withCredentials: true
        })

        console.log(res)
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data.message })

    } catch (error) {
        console.log('error:', error.response.data.message)
        dispatch({ type: PRODUCT_FAILURE, payload: error.response.data.message })
    }
}


//Get_Users_PRODUCTS
export const myAllProducts = async (dispatch) => {
    dispatch({ type: PRODUCT_REQUEST })
    try {
        let res = await axios.get("https://admin-dashborard-node-backend.onrender.com/api/v1/products/myAllProducts", {
            withCredentials: true,
        })
        // console.log("this", res.data.products)
        dispatch({ type: GET_MY_ALL_PRODUCTS_SUCCESS, payload: res.data.products })
    } catch (error) {
        // console.log('error:', error)
        dispatch({ type: PRODUCT_FAILURE })
    }
}


//all_present_Products
export const allProducts = async (dispatch) => {
    dispatch({ type: PRODUCT_REQUEST })
    try {
        let res = await axios.get("https://admin-dashborard-node-backend.onrender.com/api/v1/products/products");
        // console.log(res)
        dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: res.data.products })
    } catch (error) {
        // console.log('error:', error)
        dispatch({ type: PRODUCT_FAILURE })
    }
}


//Delete_products
export const deleteProduct = (id) => async (dispatch) => {
    dispatch({ type: PRODUCT_REQUEST })
    try {
        let res = await axios.delete(`https://admin-dashborard-node-backend.onrender.com/api/v1/products/${id}`, {
            withCredentials: true
        })
        console.log("this", res)
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: res.data.message, action: id })

    } catch (error) {
        console.log('error:', error)
        dispatch({ type: PRODUCT_FAILURE, payload: error.response.data.message })
    }
}


//Update_Product
export const updateProduct = (dataobj,id) => async (dispatch) => {
    dispatch({ type: PRODUCT_REQUEST })
    try {
        let res = await axios.put(`https://admin-dashborard-node-backend.onrender.com/api/v1/products/${id}`,dataobj,{
            withCredentials:true
        })
        console.log('res:', res)
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res.data.message })

    } catch (error) {
        console.log('rror:', error)
        dispatch({ type: PRODUCT_FAILURE })
    }
}