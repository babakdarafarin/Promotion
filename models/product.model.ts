import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    type:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    origin:{
        type: String,
        required: true,
        trim: true
    },
    vendor:{
        type: String
    },
    requiredShipping:{
        type: Boolean,
        required : true,
        default: true
    },
    isDeleted:{
        type: Boolean,
        required : true,
        default: false
    },
    isVisible:{
        type: Boolean,
        required : true,
        default: false
    },
    createdAt:{
        type: Date,
        required: true
    },
    updatedAt:{
        type: Date,
        required: true
    }

})

export interface Product extends mongoose.Document {
    title: string,
    type: string,
    description: string,
    origin: string,
    vendor: string,
    requiredShipping: boolean,
    isDeleted: boolean,
    isVisible: boolean,
    createdAt: Date,
    updatedAt: Date
}