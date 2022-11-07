import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, DELETE_ITEMS, UPDATE_ITEM } from "../actions";

const initialState = {
    products: []
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        // case GET_ITEMS:
        //     return {
        //         ...state,
        //     }

        case ADD_ITEM:
            return {
                ...state,
                products: [...state.products, action.payload]
            }

        case DELETE_ITEM:
            return {
                ...state,
                products: state.products.filter((x) => x.id !== action.payload)
            }
        case DELETE_ITEMS:
            return {
                ...state,
                products: state.products.filter((x) => !action?.payload?.includes(x.id))
            }
        case UPDATE_ITEM:
            let index = state.products.findIndex((x) => x.id === action.payload.id)
            if (index >= 0) {
                // const updatedProjects = [
                //     ...projects.slice(0, objIndex),
                //     updatedObj,
                //     ...projects.slice(objIndex + 1),
                // ];
                return {
                    ...state,
                    products: Object.assign([...state.products], { [index]: action.payload }),
                  };

                // return {
                //     ...state,
                //     products: [...state.products, { [index]: action.payload }]
                // }
            }
            // return {
            //     ...state,
            //     products: state.products
            // }
            return {
                ...state,
                products: state.products.concat(action.item),
              };
        default: return state
    }
}

export default productReducer

