import { NameCompareble } from "./name.comparable";
import { ValueCompareble } from "./value.comparable";

export const isSameOrderByProperty = (first: any[], second: any[] | undefined, property: string): boolean => {
    if (!second) {
        return first.length === 0 ? true : false;
    }
    if (first.length !== second.length) {
        return false;
    }
    if (first.length === 0) {
        return true;
    }
    for (let i = 0; i < first.length; i++) {
        if (first[i][property] !== second[i][property]) {
            return false;
        }
    }
    return true;
};

export const sameByKey = (first: any[], second: any[] | undefined, key: string): boolean => {
    if (!second) {
        return first.length === 0 ? true : false;
    }
    if (first.length !== second.length) {
        return false;
    }
    if (first.length === 0) {
        return true;
    }
    const firstKeys = first[0][key] ? first.map(item => item[key]) : first;
    const secondKeys = second[0][key] ? second.map(item => item[key]) : second;
    let result = true;
    for (let i = 0, l = first.length; i < l; i++) {
        if (!firstKeys.includes(secondKeys[i]) || !secondKeys.includes(firstKeys[i])) {
            result = false;
            break;
        }
    }
    return result;
};

export const removeItem = (array: any[], key: string, value: any): void => {
    for (let i = 0, l = array.length; i < l; i++) {
        const item = array[i];
        if (item[key] && item[key] === value) {
            array.splice(i, 1);
            break;
        }
    }
};

export const isNotEmptyArray = (array: any): boolean => {
    return !!array && !!array.length;
};

export const compareString = (first: string, second: string): number => {
    first = first.toUpperCase();
    second = second.toUpperCase();
    if (first < second) {
        return -1;
    }
    if (first > second) {
        return 1;
    }
    return 0;
};

export const compareByValueProperty = (a: ValueCompareble, b: ValueCompareble): number => {
    return compareString(a.value, b.value);
};

export const compareByNameProperty = (a: NameCompareble, b: NameCompareble): number => {
    return compareString(a.actionName, b.actionName);
};

export const chunkIdsArray = (ids: string[], chunkSize: number): string[][] => {
    let result: string[][] = [];
    for (let i = 0; i < ids.length; i = i + chunkSize) {
        result = [...result, ids.slice(i, i + chunkSize)];
    }
    return result;
};

export function sortByProperty<T, K extends keyof T>(values: T[], property: K): T[] {
  return values.sort((a, b) => {
    const firstValue = a[property] === null ? '' : '' + a[property];
    const secondValue = b[property] === null ? '' : '' + b[property];
    if (firstValue < secondValue) {
        return -1;
    }

    if (firstValue > secondValue) {
        return 1;
    }
    return 0;
  });
}
