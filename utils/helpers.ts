import {
  CalculateWinrateProps,
  MakeArrayUniqueParams,
  SaveInLocalStorageParams,
} from "@/ts/interfaces";

export const sortFieldByTabs = (fields: { Tab: string }[]) => {
  // Get tabs that are exists in fields (UNIQUE - NOT DUPLICATE); -> ["Title","Questions","Other"] for exmpl.
  const tabs: string[] = Array.from(new Set(fields?.map((field) => field.Tab)));

  const sortedTabs: any[] = [];

  // Iterate through all tabs and retrieve their fields
  tabs?.forEach((tab) => {
    const tabFields = fields?.filter((field) => field?.Tab === tab);
    sortedTabs.push({
      tab,
      fields: tabFields,
    });
  });

  //Make sure the value is an array to prevent code crashes if it isn't.
  return isValueArray(sortedTabs) ? sortedTabs : [];
};

export const isValueArray = (value: any) =>
  typeof value === "object" && Array.isArray(value);

export const maxStringLength = (value: string, options: { max: number }) =>
  +value?.length > +options?.max ? false : true;
// false - failed
// true - good

export const arrayValueExists = (
  arr: [],
  value: any,
  checkProperty?: string
) => {
  return arr?.some((existingArrayValue) =>
    checkProperty
      ? existingArrayValue[checkProperty] === value[checkProperty]
      : existingArrayValue === value
  );
};

export const saveInLocalStorage = ({ name, value }: SaveInLocalStorageParams) =>
  localStorage?.setItem(name, JSON.stringify(value));

export const readFromLocalStorage = (name: string) => {
  const valueFromLocalStorage = localStorage.getItem(name);
  if (!valueFromLocalStorage) return null;

  const parsedValue = JSON.parse(valueFromLocalStorage);

  return parsedValue;
};
export const removeFromLocalStorage = (name: string) =>
  localStorage.removeItem(name);

export const sameObjects = (obj1: any, obj2: any) => {
  return Object.keys(obj1).every((key) => obj2[key] === obj1[key]);
};

export const arrayIncludes = (arr: any[], value: any, property?: string[]) =>
  arr?.some((arrayValue) =>
    property
      ? property.some((property) => arrayValue[property] == value[property])
      : arrayValue == value
  ); // == instead of === is because i dont want to check by type, only for value, imagine situation "1" and 1, in this function that is SAME

export const makeArrayUnique = ({
  unique,
  notSameAs,
  uniqueProperty,
}: MakeArrayUniqueParams) => {
  const uniqueArray: any[] = [];

  for (let i = 0; i < unique?.length; i++) {
    const value = unique[i];

    if (arrayIncludes(notSameAs, value, uniqueProperty)) continue;

    uniqueArray?.push(value);
  }

  return uniqueArray;
};

export const calculateWinratePercentage = ({
  correctAnswers,
  totalQuestions,
}: CalculateWinrateProps) => (correctAnswers / totalQuestions) * 100;

export const getRecycledQuestions = (obj: any) => {
  const arr = [];

  // Koristim malo i ovaj for loop na old school nacin da pokazem da dobro baratam i sa time.
  for (let i = 0; i < Object.keys(obj).length; i++) {
    const key = +Object.keys(obj)[i];
    if (Number.isFinite(key)) {
      arr.push(Object.values(obj)[i]);
    } else {
      break;
    }
  }

  return arr;
};
