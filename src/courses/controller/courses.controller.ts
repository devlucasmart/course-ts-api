import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CoursesService } from '../service/courses.service';
import { UpdateCourseDTO } from '../dto/update-course.dto';
import { CreateCourseDTO } from '../dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findByOne(id);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDTO) {
    return this.courseService.create(createCourseDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDTO) {
    console.log({ message: updateCourseDto });
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
