import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const LanguageSchema = new mongoose.Schema({
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

export interface Language extends mongoose.Document {
    name: string,
    identifier: number
}