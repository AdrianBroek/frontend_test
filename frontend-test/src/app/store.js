import { configureStore } from '@reduxjs/toolkit'
import sentenceReducer from './sentenceReducer'
import textReducer from './textReducer'
import alertReducer from './alertReducer'
import authorReducer from './authorReducer'

export const store = configureStore({
  reducer: {
    sentence: sentenceReducer,
    text: textReducer,
    alert: alertReducer,
    author: authorReducer
  },
})