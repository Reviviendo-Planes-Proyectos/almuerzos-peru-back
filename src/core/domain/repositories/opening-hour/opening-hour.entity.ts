export interface IOpeningHour {
  weekDay: number;
  startTime?: string;
  endTime?: string;
  enabled: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class OpeningHour implements IOpeningHour {
  constructor(
    public weekDay: number,
    public startTime: string | undefined,
    public endTime: string | undefined,
    public enabled: boolean,
    public isDeleted: boolean | undefined,
    public createdAt: Date | undefined,
    public updatedAt: Date | undefined,
    public deletedAt: Date | undefined
  ) {}
}
