// export const GET_ITEMS = 'GET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ITEMS = 'DELETE_ITEMS';
export const UPDATE_ITEM = 'UPDATE_ITEM';


// export const getItems = (product) => {
//     return {
//         type: GET_ITEMS,
//         payload: product
//     }
// }


export const addItem = (product) => {
    return {
        type: ADD_ITEM,
        payload: product
    }
}


export const deleteItem = (productId) => {
    return {
        type: DELETE_ITEM,
        payload: productId
    }
}

export const deleteItems = (ids) => {
    return {
        type: DELETE_ITEMS,
        payload: ids
    }
}


export const updateItem = (product) => {
    return {
        type: UPDATE_ITEM,
        payload: product
    }
}














