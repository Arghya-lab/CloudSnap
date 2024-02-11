export interface PreferenceContextInterface {
  unit: unitType;
  mode: modeType;
  toggleUnitType: () => void;
  toggleMode: () => void;
}

export enum unitType {
  Imperial = "imperial",
  Metric = "metric",
}

export enum modeType {
  Dark = "dark",
  Light = "light",
}
