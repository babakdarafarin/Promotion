import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,    //no duplicate email can be set // to make effect for these properties, db should be reseted
        required: true,
        trim: true,
        lowercase: true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error('Email is invalid!')
        //     }
        // }
    },
    password:{
        type: String,
        required: true,
        //minLength: 7,
        trim: true,
        // validate(value){
        //     if(value.toLowerCase().includes('password'))
        //     {
        //         throw new Error('Invalid password')
        //     }
        // }
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }],
    referralCode:{
        type: String,
    },
    referrerId:{
        type: String
    },
    referrals:[{
        type: String
    }],
    credit: {
        type: Number,
        default : 0
    }
})

export interface User extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    tokens: string[],
    referralCode: string,
    referrerId: string,
    referrals: string[],
    credit: number,
}