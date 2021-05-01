import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../models/contact.entity';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class ContactsService {

    /**
     *
     */
    constructor(@InjectRepository(Contact)
    private contactRepository: Repository<Contact>) {
    }
    /**
     *
     */

    async  findAll(): Promise<Contact[]> {
        return await this.contactRepository.find();
    }

    async findDetail(id): Promise<Contact> {
        return await this.contactRepository.findOne(id)
    }

    async  create(contact: Contact): Promise<Contact> {
        return await this.contactRepository.save(contact);
    }

    async update(contact: Contact): Promise<UpdateResult> {
        return await this.contactRepository.update(contact.id, contact);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.contactRepository.delete(id);
    }
}
