import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173/', // your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow cookies if needed
  });

  // Use morgan only in development mode
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // Global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Global prefix
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
