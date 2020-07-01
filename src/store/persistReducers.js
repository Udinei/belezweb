﻿/** Persiste o objeto state do redux no storage local ou outro BD */
import storage from 'redux-persist/lib/storage'; // local de persistencia dos dados
import { persistReducer } from 'redux-persist'; // lib de presistencia

export default reducers => {
    // persiste no localStorage a lista de reducer com a key belezweb
    const persistedReducer = persistReducer({
        key: 'belezweb',
        storage,
        whitelist: ['auth', 'user'], // reducer que seram persistidos no storare
    },
     reducers
    );
    //
    return persistedReducer;
}


