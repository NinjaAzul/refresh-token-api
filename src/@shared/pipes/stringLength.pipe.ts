import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class StringLengthPipe implements PipeTransform {
  constructor(private length: number) {}

  transform(value: string) {
    if (value.length > this.length) {
      throw new BadRequestException('String length is too long');
    }

    return value;
  }
}
