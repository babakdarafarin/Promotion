import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const PricingStrategySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: Number,
        required: true
    },
    value: {
        type: Number
    },
    // minPurchasedAmount: {
    //     type: Number
    // },
    // minPurchasedItems: {
    //     type: Number
    // },
    maxDiscountAmount: {
        type: Number,
        required: true
    },
    regionGroups: [{
        type: Number
    }]
})

export interface PricingStrategy extends mongoose.Document {
    name: string,
    type: number,
    value: number,
    // minPurchasedAmount: number,
    // minPurchasedItems: number,
    maxDiscountAmount: number,
    regionGroups: number[]
}