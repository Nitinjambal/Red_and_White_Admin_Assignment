import { ADD_PRODUCT_SUCCESS, ALL_PRODUCTS_SUCCESS, DELETE_PRODUCT_SUCCESS, GET_MY_ALL_PRODUCTS_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./actionTypes"


const initialState = {
    isLoading: false,
    isError: false,
    myProducts: {},
    productAddSuccess: false,
    message: "",
    auth: false,
    products: [],
    deleteSuccess: false,
    updateSuccess: false,
}

export const reducer = (state = initialState, { type, payload, action }) => {
    switch (type) {
        case PRODUCT_REQUEST:
            return {
                ...state, isLoading: true, isError: false
            }

        case ADD_PRODUCT_SUCCESS:
            return {
                ...state, isLoading: false, isError: false, productAddSuccess: true, message: payload, auth: true
            }

        case PRODUCT_FAILURE:
            return {
                ...state, isLoading: false, isError: true, productAddSuccess: false, message: payload, auth: true, deleteSuccess: false, updateSuccess: false

            }
        case GET_MY_ALL_PRODUCTS_SUCCESS:
            return {
                ...state, isLoading: false, isError: false, myProducts: payload, auth: true

            }

        case ALL_PRODUCTS_SUCCESS:
            return {
                ...state, isLoading: false, isError: false, auth: true, products: payload
            }

        case DELETE_PRODUCT_SUCCESS:

            const updatedProducts = state.products.filter((product) => product._id !== action);
            // console.log(updatedProducts)
            return {
                ...state, isLoading: false, isError: false, auth: true, deleteSuccess: true, message: payload, products: updatedProducts
            }

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state, isLoading: false, isError: false, auth: true, updateSuccess: true, message: payload
            }
        default:
            return state
    }
}