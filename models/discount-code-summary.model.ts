import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const DiscountCodeSummarySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    customerGroupId: {
        type: String
    },
    customerGroupName: {
        type: String
    },
    productGroupId: {
        type: String
    },
    productGroupName: {
        type: String
    },
    pricingStrategyId: {
        type: String
    },
    pricingStrategyName: {
        type: String
    },
    identityId: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

export interface DiscountCodeSummary extends mongoose.Document {
    code: string,
    type: number,
    description: string,
    startDate: Date,
    endDate: Date,
    customerGroupId: string,
    customerGroupName: string,
    productGroupId: string,
    productGroupName: string,
    pricingStrategyId: string,
    pricingStrategyName: string,
    identityId: string,
    isActive: boolean,
    isDeleted: boolean
}