import { Contact } from './contact.entity';

describe('ContactEntity', () => {
  it('should be defined', () => {
    expect(new Contact()).toBeDefined();
  });
});
