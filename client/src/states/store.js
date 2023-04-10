import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/index'
import thunk from 'redux-thunk'
import {applyMiddleware,compose } from "redux"

const store = configureStore({reducer},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
     compose(applyMiddleware(thunk))
     )

export default store