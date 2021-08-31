import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const MessagingStrategySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    contactChannel:{
        type: Number,
        trim: true
    },
    contactAt: [{
        type: Date
    }]
})

export interface MessagingStrategy extends mongoose.Document {
    name: string,
    contactChannel: number,
    contactAt: Date[]
}