import { configureStore } from '@reduxjs/toolkit';
import libroReducer from './reducer';

const store = configureStore({
    reducer: {
        holaAPP: libroReducer // Asegúrate de usar el mismo nombre aquí
    }
});

export default store;
