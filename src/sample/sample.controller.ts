import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProfileDto } from './domain/dto/create-profile.dto';
import { SampleService } from './sample.service';
import { Permission } from '@rnd-ai-npm-domain/identity-middleware';
import { ListProfilesDto } from './domain/dto/list-profile.dto';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  /**
   *  This route can return all response of any job id
   */
  @Get('/jobs/:jobId/status')
  @UseGuards(new Permission(['profile']))
  async getJobStatus(@Param('jobId') jobId: string) {
    return await this.sampleService.getJobStatus(jobId);
  }

  @Post()
  @UseGuards(new Permission(['profile']))
  async createNewProfile(@Body() data: CreateProfileDto) {
    return await this.sampleService.createNewProfile(data);
  }

  @Get('/users')
  @UseGuards(new Permission(['profile']))
  async getAllUsers(@Query() queryParams: ListProfilesDto) {
    return await this.sampleService.getAllUsers(queryParams);
  }

  @Get(':profileId')
  @UseGuards(new Permission(['profile']))
  async getUserProfile(@Param('profileId') profileId: string) {
    return await this.sampleService.getUserProfile(profileId);
  }
}
