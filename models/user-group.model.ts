import * as mongoose from 'mongoose'
//import { validator } from 'validator'

export const UserGroupSchema = new mongoose.Schema({    
    name: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    userIds:[{
        type: String
    }]
})

export interface UserGroup extends mongoose.Document {
    name: string,
    description: string,
    userIds: string[]
}