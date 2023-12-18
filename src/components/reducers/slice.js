import { createSlice } from "@reduxjs/toolkit";
import { connect } from "react-redux";

const slice = createSlice(
    {
        name:"slice",
        initialState:{
            user:{
                username:"",
                password:"",
                email:"",
                Egems:0,
                gems:0,
                cards:[]
            },
            connected:false
        },
        reducers:{
            addgems:(state,action)=>{
                state.user.gems += action.payload;
            },
            addegems:(state,action)=>{
                state.user.egems += action.payload;
            },
            addcard:(state,action)=>{
                state.user.cards.push(action.payload);
            },
            connectuser:(state,action)=>{
                state.connected = true;
                state.user.username = action.payload.username
                state.user.password = action.payload.password
                state.user.email = action.payload.email
                state.user.Egems = action.payload.Egems
                state.user.gems = action.payload.gems
                state.user.cards = action.payload.cards
            },
            disconnectuser:(state)=>{
                state.connected = false;
            },
            clearcards:(state)=>{
                state.user.cards = [];
            }
        }
    }
)

export default slice.reducer

export const {addgems,addegems,addcard,connectuser,disconnectuser,clearcards} = slice.actions;