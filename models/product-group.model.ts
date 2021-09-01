import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const ProductGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    productIds:[{
        type: String
    }]
})

export interface ProductGroup extends mongoose.Document {
    name: string,
    description: string,
    productIds: string[]
}