export class Day {
  public number: number;
  public year: number;

  public month: string;
  public monthIndex: number;

  public weekDayName: string;
  public weekDayNumber: number;

  public events: any;

  constructor(
    number: number,
    year: number,
    month: string,
    monthIndex: number,
    weekDayName: string,
    weekDayNumber: number,
    events: any
  ) {
    this.number = number;
    this.year = year;
    this.month = month;
    this.monthIndex = monthIndex;
    this.weekDayName = weekDayName;
    this.weekDayNumber = weekDayNumber;
    this.events = events;
  }
}
