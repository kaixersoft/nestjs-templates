import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProfileDto } from './domain/dto/create-profile.dto';
import { SampleService } from './sample.service';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  async createNewProfile(@Body() data: CreateProfileDto) {
    return await this.sampleService.createNewProfile(data);
  }

  @Get('/jobs/:jobId/status')
  async getJobStatus(@Param('jobId') jobId: string) {
    return await this.sampleService.getJobStatus(jobId);
  }

  @Get('/users')
  async getAllUsers() {
    return await this.sampleService.getAllUsers();
  }

  @Get(':profileId')
  async getUserProfile(@Param('profileId') profileId: string) {
    return await this.sampleService.getUserProfile(profileId);
  }
}
