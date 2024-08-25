import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCourseDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber({}, { message: 'course_fee must be a valid number' })
  @Transform(({ value }) => {
    const num = parseFloat(value);
    return isNaN(num) ? value : num;
  }, { toClassOnly: true })
  readonly course_fee?: number;

  @IsString({ each: true })
  readonly tags: string[];
}

function ToCurrency(value: any) {
  const numberValue = parseFloat(value);

  if (isNaN(numberValue)) {
    return value;
  }

  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}