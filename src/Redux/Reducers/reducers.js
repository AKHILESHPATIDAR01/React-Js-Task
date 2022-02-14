import { INCREMENT, DECREMENT, FETCH_DATA } from '../Types/types.js';

const INITIAL_STATE = {
    data: []
};
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state, data: action.data
            };
         default: return state;
    }
};
export default reducer;
