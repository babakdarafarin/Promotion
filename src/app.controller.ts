import { Controller, HttpStatus, Res } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ProfileDto } from './Dtos/profile.dto';
import { SearchDto } from './Dtos/search.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('CREATE_DOCTOR_INDEX')
  async CreateDoctorIndex(@Res() res: Response){
    return await this.appService.CreateDoctorIndex()

    // if(result.wasSuccessful){
    //   res.status(HttpStatus.CREATED).
    //   .send();
    // }
    // else{
    //   res.status(HttpStatus.BAD_REQUEST).send()
    // }
  }
  
  @EventPattern('BULK_CREATE_DOCTOR_PROFILES')
  async BulkCreateDoctorProfiles(@Payload() profiles: ProfileDto[]){

    await this.appService.BulkCreateDoctorProfiles(profiles)
  }

  @EventPattern('BULK_UPDATE_DOCTOR_PROFILES')
  async BulkUpdateDoctorProfiles(@Payload() profiles: ProfileDto[]){

    return await this.appService.BulkUpdateDoctorProfiles(profiles)
  }

  @EventPattern('SEARCH_DATA')
  async SearchData(@Payload() searchModel: SearchDto){

    return await this.appService.SearchData(searchModel.index, searchModel.q, searchModel.from, searchModel.size)
  }

  @EventPattern('Get_ALL_IDS')
  async GetAllIds(@Payload() searchModel: SearchDto){

    return await this.appService.SearchData(searchModel.index, searchModel.q, searchModel.from, searchModel.size)
  }

  @EventPattern('DELETE_INDEX')
  async DeleteIndex(@Payload() index: string){

    await this.appService.DeleteIndex(index)
  }

  @EventPattern('BULK_DELETE_DOCTOR_PROFILES')
  async BulkDeleteDoctorProfiles(@Payload() idLists: string[]){

    return await this.appService.BulkDeleteDoctorProfiles(idLists)
  } 
}

