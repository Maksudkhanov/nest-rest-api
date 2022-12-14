import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { Course } from './course/course.model';
import { CourseModule } from './course/course.module';
import { ThemeModule } from './theme/theme.module';
import { FileModule } from './file/file.module';
import { File } from './file/file.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [Course, File],
      autoLoadModels: true,
    }),
    CourseModule,
    ThemeModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('course');
  }
}
