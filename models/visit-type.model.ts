import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const VisitTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    identifier: {
        type: Number,
        required: true
    }
})

export interface VisitType extends mongoose.Document {
    name: string,
    identifier: number
}