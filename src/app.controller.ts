import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { CustomResponse } from './Response/custom-response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}

