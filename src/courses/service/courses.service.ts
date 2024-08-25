import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Course } from '../entities/courses.entity';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from '../dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tags.entity';
import { UpdateCourseDTO } from '../dto/update-course.dto';

@Injectable()
export class CoursesService {
  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>;

  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>;

  async findAll(): Promise<Course[]> {
    const courses = await this.courseRepository.find();
    if (courses.length == 0) {
      throw new HttpException(`Nenhum Curso Cadastrado`, HttpStatus.NOT_FOUND);
    }
    return courses;
  }

  async findByOne(id: string) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new HttpException(
        `Course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    try {
      const tags = await Promise.all(
        createCourseDTO.tags.map((name) => this.preloadTagByName(name)),
      );
      const course = this.courseRepository.create({
        ...createCourseDTO,
        tags,
      });
      return this.courseRepository.save(course);
    } catch (error) {
      throw new HttpException(
        'Falha ao cadastrar Curso',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateCourseDTO: UpdateCourseDTO) {
    const tags =
      updateCourseDTO.tags &&
      (await Promise.all(
        updateCourseDTO.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      id,
      tags,
    });
    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }
    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });
    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }
    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });
    if (tag) {
      return tag;
    }
    return this.tagRepository.create({ name });
  }
}
