import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;
  
  appendName() {
    return `${this.content} Sarge`;
  }
}
