import { Injectable } from '@nestjs/common';
import { Contact } from './contact.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ContactsService {
  constructor(@InjectModel('Contact') private ContactModel: Model<Contact>) {}

  addOneContact(contact: Contact) {
    let c = new this.ContactModel({ ...contact });
    c.save();
    return c;
  }

  getAllContacts(page: number, limit: number) {
    return this.ContactModel.find()
      .limit(limit)
      .skip((page - 1) * limit);
  }

  getOneContact(id: string) {
    return this.ContactModel.findById(id);
  }

  patchContact(id: any, body: any) {
    return this.ContactModel.updateOne({ _id: id }, { $set: body });
  }

  updateContact(id: string, contact: Contact) {
    return this.ContactModel.updateOne({ _id: id }, contact);
  }

  deleteContact(id: string) {
    return this.ContactModel.deleteOne({ _id: id });
  }
}
