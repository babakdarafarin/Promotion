import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const DiscountCodeIdentitySchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date
    }
})

export interface DiscountCodeIdentity extends mongoose.Document {
    code: string,
    description: string,
    startDate: Date,
    endDate: Date,
}