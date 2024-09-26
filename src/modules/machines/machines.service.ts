import { Injectable } from '@nestjs/common';

import { MachinesRepository } from './machines.repository';

@Injectable()
export class MachinesService {
  constructor(private readonly machinesRepository: MachinesRepository) {}

  async findAll() {
    return await this.machinesRepository.findAll();
  }
}
