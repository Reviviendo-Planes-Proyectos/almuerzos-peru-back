export interface ICard {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class Card implements ICard {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public isActive: boolean,
    public isDeleted: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date
  ) {}
}
