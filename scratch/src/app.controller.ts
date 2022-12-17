import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {
  @Get('/')
  getRootRoute() {
    return 'hi there!';
  }
}
