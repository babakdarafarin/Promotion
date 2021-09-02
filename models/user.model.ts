import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
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
    userId: string,
    referralCode: string,
    referrerId: string,
    referrals: string[],
    credit: number,
}