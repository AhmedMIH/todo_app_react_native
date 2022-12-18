import ReduxThunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import reducers from './reducers'

const store = configureStore({reducer:reducers,middleware:getDefaultMiddleware().concat(ReduxThunk)})

export default store