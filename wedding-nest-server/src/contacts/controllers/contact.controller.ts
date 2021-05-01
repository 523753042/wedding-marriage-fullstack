import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../models/contact.entity';


@Controller('contacts')
export class ContactsController {

  /**
   *
   */
  constructor(private contactsService: ContactsService) {
  }

  @Get()
  index(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }
  @Get(':id')
  findDetail(@Param('id') id): Promise<Contact> {
    return this.contactsService.findDetail(id)
  }

  @Post('create')
  async create(@Body() contactData: Contact): Promise<any> {
    return this.contactsService.create(contactData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() contactData: Contact): Promise<any> {
    contactData.id = Number(id);
    console.log('Update #' + contactData.id)
    return this.contactsService.update(contactData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.contactsService.delete(id);
  }

}
