import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from './domain/dto/create-profile.dto';
import { SampleService } from './sample.service';
import { Permission } from '@rnd-ai-npm-domain/identity-middleware';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  @UseGuards(new Permission(['profile']))
  async createNewProfile(@Body() data: CreateProfileDto) {
    return await this.sampleService.createNewProfile(data);
  }

  @Get('/jobs/:jobId/status')
  @UseGuards(new Permission(['profile']))
  async getJobStatus(@Param('jobId') jobId: string) {
    return await this.sampleService.getJobStatus(jobId);
  }

  @Get('/users')
  @UseGuards(new Permission(['profile']))
  async getAllUsers() {
    return await this.sampleService.getAllUsers();
  }

  @Get(':profileId')
  @UseGuards(new Permission(['profile']))
  async getUserProfile(@Param('profileId') profileId: string) {
    return await this.sampleService.getUserProfile(profileId);
  }
}
