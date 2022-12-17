import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  NotFoundException
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  
  constructor(public messagesService: MessagesService) {}
  
  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }
  
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    this.messagesService.create(body.content);
  }
  
  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return;
  }
}
