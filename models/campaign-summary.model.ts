import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const CampaignSummarySchema = new mongoose.Schema({
    type: {                     
        type: Number,
        required: true
    },
    name: {                     
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
    customerGroupsIds: [{
        type: String
    }],
    customerGroupsNames: [{
        type: String
    }],
    productGroupsIds: [{
        type: String
    }],
    productGroupsNames: [{
        type: String
    }],
    pricingStrategyId: {
        type: String
    },
    pricingStrategyName: {
        type: String
    },
    messagingStrategiesIds: [{
        type: String
    }],
    messagingStrategiesNames: [{
        type: String
    }],
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

export interface CampaignSummary extends mongoose.Document {
    type: number,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    customerGroupsIds: string[],
    customerGroupsNames: string[],
    productGroupsIds: string[],
    productGroupsNames: string[],
    pricingStrategyId: string,
    pricingStrategyName: string,
    messagingStrategiesIds: string[],
    messagingStrategiesNames: string[],
    identityId: string,
    isActive: boolean,
    isDeleted: boolean
}