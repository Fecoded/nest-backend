import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  NotFoundException,
  Put,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Delete,
  Patch,
  HttpException,
} from '@nestjs/common';
import { Contact } from './contact.schema';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private service: ContactsService) {}

  // Create a Contact
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createContact(@Body() body: Contact) {
    return this.service.addOneContact(body);
  }

  // GET CONTACTS
  @Get()
  getAll(
    @Query('_page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('_limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.service.getAllContacts(page, limit);
  }

  // GET CONTACT BY ID
  @Get('/:id')
  async getOneContact(@Param('id') id: string) {
    let c = await this.service.getOneContact(id);
    if (!c) throw new NotFoundException();
    return c;
  }

  // PATCH CONTACT
  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async patchContact(@Param('id') id, @Body() body) {
    try {
      await this.service.patchContact(id, body);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // UPDATE CONTACT
  @Put('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateContact(@Param('id') id, @Body() body: Contact) {
    try {
      await this.service.updateContact(id, body);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  // DELETE CONTACT
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteContact(@Param('id') id: string) {
    let ret = await this.service.deleteContact(id);
    if (ret.deletedCount === 0) {
      throw new NotFoundException();
    }
  }
}
