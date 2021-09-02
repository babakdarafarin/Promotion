import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from '../../../models/user.model'
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'
import { CustomResponse } from "src/response/custom-response";

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async GetUsers(): Promise<CustomResponse> {
        return new CustomResponse(
            'All Users Were Listed!',
            true,
            await this.userModel.find()
        )
    }

    async AddUser(userId: string) : Promise<CustomResponse> {

        const newUser = new this.userModel({
            userId: userId
        })
        await newUser.save()

        return new CustomResponse(
            'User Was Created!',
            true,
            newUser._id
        )
    } 

    async findUserByUserName(username: string): Promise<User> {

        const user = this.userModel.findOne({username})

        return user
    }

    async findUserByReferralCode(referralCode: string): Promise<User> {
        const user = await this.userModel.findOne({referralCode})
        
        return user
    }

    async findUserById(userId: string): Promise<User> {

        const user = this.userModel.findOne({ userId : userId })

        return user
    }
}