// cartReducer.js
export const initialState = {
  items:        [],
  discountCode: '',
  discount:     0,
  error:        null
};

export function cartReducer(state, action) {
  switch (action.type) {

    /* ───────── cart items ───────── */
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.id === action.payload.id);
      const items  = exists
        ? state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { ...state, items };
    }

    case 'REMOVE_ITEM': {
      const items = state.items
        .map(i => i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0);
      return { ...state, items };
    }

    /* ───────── discount logic ───────── */
    case 'SET_CODE':
      return { ...state, discountCode: action.payload };

    case 'APPLY_DISCOUNT':
      return state.discountCode === 'SAVE10'
        ? { ...state, discount: 10, error: null }
        : { ...state, discount: 0,  error: 'Invalid code' };

    /* ───────── reset ───────── */
    case 'CLEAR_CART':
      return initialState;

    /* ───────── default ───────── */
    default:
      return state;
  }
}
