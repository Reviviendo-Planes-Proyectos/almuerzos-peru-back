export interface IAdmin {
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Admin implements IAdmin {
  constructor(
    public isDeleted?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date
  ) {}
}
