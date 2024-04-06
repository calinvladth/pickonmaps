import { configureStore } from '@reduxjs/toolkit'
import picksReducer from "./picksSlice";
import mapsReducer from './mapsSlice'
import generalReducer from './generalSlice'

export const store = configureStore({
    reducer: {
        picks: picksReducer,
        maps: mapsReducer,
        general: generalReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch