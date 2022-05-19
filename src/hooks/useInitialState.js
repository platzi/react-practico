import { useState } from 'react';

const InitialState = {
    cart: [],
}

const useInitialState = () => {
    const [state, setState] = useState(InitialState);

    const addToCart = (payload) => {
        setState({
            ...state,
            cart: [...state.cart, payload]
        });
    };
    return {
        state,
        addToCart
    }
}

export default useInitialState;