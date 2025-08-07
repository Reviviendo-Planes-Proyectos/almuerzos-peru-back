export interface IConsumer {
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Consumer implements IConsumer {
  constructor(
    public isDeleted?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date
  ) {}
}
