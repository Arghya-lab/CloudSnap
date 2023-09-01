import { DateTime } from "luxon";

export const dateAndTime = (epochTime, timeZone) => DateTime.fromSeconds(epochTime)
.setZone(timeZone)
.toFormat("DD | t");

export const time = (epochTime, timeZone) => DateTime.fromSeconds(epochTime)
.setZone(timeZone)
.toFormat("t");

export const date = (epochTime, timeZone) => DateTime.fromSeconds(epochTime)
.setZone(timeZone)
.toFormat("dd/MM");