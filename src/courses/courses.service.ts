import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'Fundamentos do NestJS',
      tags: ['node.js', 'nest.js', 'javaScript', 'typescript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findByOne(id: number) {
    const courses = this.courses.find((course) => course.id === id);
    if (!courses) {
      throw new HttpException(
        `Course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
  }

  update(id: number, updateCourseDTO: any) {
    const existsCourse = this.findByOne(id);
    if (existsCourse as any) {
      const index = this.courses.findIndex((course) => course.id === id);
      this.courses[index] = {
        id,
        ...updateCourseDTO,
      };
    }
  }

  remove(id: number): void {
    const index = this.courses.findIndex((course) => course.id === id);
    if (index !== -1) {
      this.courses.splice(index, 1);
    }
  }
}
