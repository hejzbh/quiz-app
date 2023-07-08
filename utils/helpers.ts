import { SaveInLocalStorageParams } from "@/ts/interfaces";

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
