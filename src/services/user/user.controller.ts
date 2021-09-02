import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CustomResponse } from "src/response/custom-response";
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

    @EventPattern('user.get_all')
    async GetUsers() : Promise<CustomResponse> {
      return this.userService.GetUsers()
    }

    @EventPattern('user.add')
    async AddUser(@Payload() userId : string) : Promise<CustomResponse> {
        return this.userService.AddUser(userId)
    }
}
