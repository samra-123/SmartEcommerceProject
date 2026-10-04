
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { shippingcharge, taxes } from '../Components/constants/constantfile';
//import { ActionSheetIOS } from '../node_modules/react-native/types/index';

const initialState = {
    items: [],
    freecash:0,
    appliedfreecash:0,
    finalAmount:0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {

        // additems to cart

        addCartItems: (state, action) => {

            const isItemExist = state.items.find(item => item.id === action.payload.id)

            if (isItemExist) { // checks if item already exist(added) in cart screen if yes then just add quantity and sum 
                isItemExist.qty += 1;
                isItemExist.sum += action.payload.price;
            }
            else {// if item not exists or added in cart already then just add new entry in cart

                state.items.push({
                    ...action.payload,
                    qty: 1,
                    sum: action.payload.price
                })
            }

        },
        // removeitems to cart

        removeItemFromCart: (state, action) => { // this will decrease item count on press subtract
            const ExistItem = state.items.find(item => item.id === action.payload.id);

            if (ExistItem && ExistItem.qty != 1) {
                ExistItem.qty -= 1;
                ExistItem.sum -= action.payload.price;
            }
            else {
                state.items = state.items.filter(item => item.id !== action.payload.id)// to remove item from cart
            }

        },


        ///remove products to cart// this will delete the product from cart list

        removeProductFromCart: (state, action) => {

            state.items = state.items.filter(item => item.id !== action.payload.id) // to remove item from cart

        },

        // apply free cash code
        setFreeCash:(state, action)=>{
            state.freecash=action.payload// starting value is 0

        },

        applyfreecash:(state, action)=>{
            const usefreecash=action.payload;// boolean vlue true or false
            const cartTotal=state.items.reduce((acc, item)=>acc+item.sum,0);
            const orderTotal=cartTotal+shippingcharge+taxes
            const appliedcash=usefreecash? Math.min(cartTotal, state.freecash):0;
            state.appliedfreecash=appliedcash;
            state.finalAmount=orderTotal-appliedcash;

        },

        //empty cart
        emptyCart: (state) => { state.items = [], state.finalAmount=0, state.appliedfreecash=0 }


    }
})


export const { addCartItems, removeItemFromCart,
     removeProductFromCart, emptyCart , setFreeCash, applyfreecash} = cartSlice.actions;

export default cartSlice.reducer