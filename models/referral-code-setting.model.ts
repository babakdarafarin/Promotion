import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const ReferralCodeSettingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default : true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

export interface ReferralCodeSetting extends mongoose.Document {
    name: string,
    value: number,
    isActive: boolean,
    isDeleted: boolean
}