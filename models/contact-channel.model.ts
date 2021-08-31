import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const ContactChannelSchema = new mongoose.Schema({
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

export interface ContactChannel extends mongoose.Document {
    name: string,
    identifier: number
}