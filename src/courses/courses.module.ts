import { Module } from '@nestjs/common';
import { CoursesController } from './controller/courses.controller';
import { CoursesService } from './service/courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { Course } from './entities/courses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Tag])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
