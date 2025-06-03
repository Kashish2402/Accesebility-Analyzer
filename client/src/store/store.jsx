import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import resultReducer from "../features/ResultsSlice"

export default configureStore({
    reducer: {
        auth:authReducer,
        result:resultReducer
    }
})