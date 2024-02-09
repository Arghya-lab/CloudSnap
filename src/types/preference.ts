export interface PreferenceContextInterface {
  unit: unitType;
  savedCity: string;
  mode: modeType;
  toggleUnitType: () => void;
  setCity: (city: string) => void;
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
