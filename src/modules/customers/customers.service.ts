import { Injectable } from '@nestjs/common';

import { CustomersRepository } from './customers.repository';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async findAll() {
    return await this.customersRepository.findAll();
  }
}
