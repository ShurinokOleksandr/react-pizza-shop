import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    totalPrice:0,
    items:[]
}

export  const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        // addItem(state,action){
        //     const findItemSameId = state.items.find(obj => obj.id === action.payload.id)
        //     const findItemDifType = state.items.find(obj => obj.type === action.payload.type)
        //     if(findItemSameId && (findItemSameId.type === findItemDifType)){
        //         findItemSameId.cout++
        //     }else{
        //         state.items.push({
        //             ...action.payload,cout:1
        //         })
        //     }
        //     state.totalPrice = state.items.reduce(( sum, obj)  => { return sum + (obj.cout * obj.price) } ,0 )
        // },
        addItem(state,action){
            const findItemSameId = state.items.find(obj => obj.id === action.payload.id)
            const findItemDifType = state.items.find(obj => obj.type === action.payload.type)
            console.log(state.items.type)
            if(findItemSameId){
                findItemSameId.cout++
            }else{
                state.items.push({
                    ...action.payload,cout:1
                })
            }
            state.totalPrice = state.items.reduce(( sum, obj)  => { return sum + (obj.cout * obj.price) } ,0 )
        },
        removeItem({items},{payload}){
            items = items.filter(obj => obj.id !== payload)
        },
        clearItems({items}){
            items=[]
        }
    }
})
export const {addItem, removeItem, clearItems } = cartSlice.actions
export default cartSlice.reducer
