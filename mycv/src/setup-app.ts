// not used
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

export const setupApp = (app) => {
  app.use(cookieSession({
    keys: ['cookie_string_1']
  }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
};

// not used