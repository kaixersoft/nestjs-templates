import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class BullboardController {
  @Get()
  async getDashboard(@Res() res: Response) {
    return res.redirect('/dashboard');
  }
}
