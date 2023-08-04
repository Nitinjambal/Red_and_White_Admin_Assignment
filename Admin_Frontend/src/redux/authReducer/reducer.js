import { AUTH_FAILURE, AUTH_REQUEST, LOGINED_USER, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from "./actionTypes"

const initialState = {
    isLoading: false,
    isError: false,
    registerSuccess: false,
    message: "",
    loginSuccess: false,
    loginUser: {},
    auth: false,
    logoutSuccess: false

}

export const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case AUTH_REQUEST:
            return {
                ...state, isLoading: true, isError: false

            }
        case REGISTER_SUCCESS:
            return {
                ...state, registerSuccess: true, isLoading: false, isError: false, message: payload, auth: true, loginSuccess: true

            }

        case AUTH_FAILURE:
            return {
                ...state, registerSuccess: false, isError: true, isLoading: false, message: payload, loginSuccess: false, logoutSuccess: false, auth: false
            }


        case LOGIN_SUCCESS:
            return {
                ...state, isError: false, isLoading: false, loginSuccess: true, message: payload, auth: true
            }

        case LOGINED_USER:
            return {
                ...state, isError: false, isLoading: false, loginUser: payload, auth: true
            }

        case LOGOUT_SUCCESS:
            return {
                ...state, isError: false, auth: false, isLoading: false, logoutSuccess: true, message: payload, loginSuccess: false, loginUser: {}
            }

        default:
            return state


    }
}
