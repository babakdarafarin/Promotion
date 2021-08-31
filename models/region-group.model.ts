import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const RegionGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    regionsList: [{
        type: Number,
        required: true
    }]
})

export interface RegionGroup extends mongoose.Document {
    name: string,
    regionsList: number[]
}