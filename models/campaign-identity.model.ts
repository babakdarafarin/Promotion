import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const CampaignIdentitySchema = new mongoose.Schema({
    name: {
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
    },
    bannerColors:[{
        type: String
    }]
})

export interface CampaignIdentity extends mongoose.Document {
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    bannerColors: [string]
}