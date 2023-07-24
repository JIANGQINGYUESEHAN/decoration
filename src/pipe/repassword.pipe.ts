import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class TestRePassword implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(1);

    if (metadata.type === 'body' && typeof value !== 'object') {
      try {
        value = JSON.parse(value);
        console.log(value);

      } catch (e) {
        throw new BadRequestException('Invalid JSON data');
      }
    }
  }

}
