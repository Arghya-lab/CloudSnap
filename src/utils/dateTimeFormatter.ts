import { DateTime } from "luxon";

export const dateAndTime = (epochTime: number, timeZone: string): string =>
  DateTime.fromSeconds(epochTime)
    .setZone(timeZone)
    .toFormat("LLL dd',' yy | t");

export const time = (epochTime: number, timeZone: string): string =>
  DateTime.fromSeconds(epochTime).setZone(timeZone).toFormat("t");

export const date = (epochTime: number, timeZone: string): string =>
  DateTime.fromSeconds(epochTime).setZone(timeZone).toFormat("dd/MM");
