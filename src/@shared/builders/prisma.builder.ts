import { generatePagination } from '../helpers';

type Pagination = {
  skip?: number;
  page?: number;
  take?: number;
  totalPages?: number;
};

export abstract class PrismaBuilder<WhereInput, OrderByInput = unknown> {
  constructor(
    protected where: WhereInput,
    protected pagination: Pagination = {},
    protected orderBy?: OrderByInput,
  ) {}

  addPagination(page: number, take: number, total?: number) {
    const pagination = generatePagination(page, take, total);

    this.pagination = pagination;

    return this;
  }

  addOrderBy(orderBy: OrderByInput) {
    this.orderBy = orderBy;

    return this;
  }

  build() {
    return {
      where: this.where,
      pagination: this.pagination,
      orderBy: this.orderBy,
    };
  }

  protected addWhereInput(input: WhereInput): void {
    this.where = {
      ...this.where,
      ...input,
    };
  }
}
