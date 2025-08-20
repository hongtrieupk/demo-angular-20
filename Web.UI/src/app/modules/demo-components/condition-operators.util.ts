import { DateTimeTypeEnum, DropdownListTypeEnum, FreeInputTypeEnum } from './condition-form/enum/field-type.enum';
import {
    BetweenOperatorEnum, MultipleValueOperatorEnum,
    NoValueOperatorEnum, SingleValueOperatorEnum
} from './condition-form/enum/operator.enum';
import { KeyValueModel } from './models/visibility-condition.model';

// Equals
// Not Equals
// Between
// After
// On or After
// Before
// On or Before
// Is Blank
// Is Not Blank
export const filterDateOperators = (operators: KeyValueModel[]): KeyValueModel[] => {
    return operators.filter(x => {
        const operator = x.id;
        const validSingleOperator = Object.values(SingleValueOperatorEnum).includes(operator as SingleValueOperatorEnum)
            && operator !== SingleValueOperatorEnum.Like && operator !== SingleValueOperatorEnum.NotLike;
        const validBetweenOperator = operator === BetweenOperatorEnum.Between;
        const validNoValueOperator = Object.values(NoValueOperatorEnum).includes(operator as NoValueOperatorEnum);
        return validSingleOperator || validBetweenOperator || validNoValueOperator;
    });
};

// Equals
// Is Blank
// Is Not Blank
export const filterBooleanOperators = (operators: KeyValueModel[]): KeyValueModel[] => {
    return operators.filter(x => {
        const operator = x.id;
        const validNoValueOperator = Object.values(NoValueOperatorEnum).includes(operator as NoValueOperatorEnum);
        const validSingleOperator = operator === SingleValueOperatorEnum.Equal;
        return validSingleOperator || validNoValueOperator;
    });
};

// Equals
// Not Equals
// Greater Than
// Greater Than Equals
// Less Than
// Less Than Equals
// Is Blank
// Is Not Blank
export const filterNumberOperators = (operators: KeyValueModel[]): KeyValueModel[] => {
    return operators.filter(x => {
        const operator = x.id;
        const validSingleOperator = Object.values(SingleValueOperatorEnum).includes(operator as SingleValueOperatorEnum)
            && operator !== SingleValueOperatorEnum.Like && operator !== SingleValueOperatorEnum.NotLike;
        const validNoValueOperator = Object.values(NoValueOperatorEnum).includes(operator as NoValueOperatorEnum);
        return validSingleOperator || validNoValueOperator;
    });
};

// Equals
// Not Equals
// In
// Not In
// Is Blank
// Is Not Blank
export const filterMultiplePicklistOperators = (operators: KeyValueModel[]): KeyValueModel[] => {
    return operators.filter(x => {
        const operator = x.id;
        const validMultipleOps = Object.values(MultipleValueOperatorEnum).includes(operator as MultipleValueOperatorEnum);
        const validSingleOps = operator === SingleValueOperatorEnum.Equal || operator === SingleValueOperatorEnum.NotEqual;
        const validNoValueOperator = Object.values(NoValueOperatorEnum).includes(operator as NoValueOperatorEnum);
        return validMultipleOps || validNoValueOperator || validSingleOps;
    });
};

// Equals
// Not Equals
// Is Blank
// Is Not Blank
export const filterSinglePicklistOperators = (operators: KeyValueModel[]): KeyValueModel[] => {
    return operators.filter(x => {
        const operator = x.id;
        const validSingleOps = operator === SingleValueOperatorEnum.Equal || operator === SingleValueOperatorEnum.NotEqual;
        const validNoValueOperator = Object.values(NoValueOperatorEnum).includes(operator as NoValueOperatorEnum);
        return validNoValueOperator || validSingleOps;
    });
};

// Equals
// Not Equals
// Like
// Not Like
// Is Blank
// Is Not Blank
// 'text', 'link', 'string'
export const filterFreeTextOperators = (operators: KeyValueModel[]): KeyValueModel[] => {
    return operators.filter(x => {
        const operator = x.id;
        const validSingleOps = operator === SingleValueOperatorEnum.Equal || operator === SingleValueOperatorEnum.NotEqual
            || operator === SingleValueOperatorEnum.Like || operator === SingleValueOperatorEnum.NotLike;
        const validNoValueOperator = Object.values(NoValueOperatorEnum).includes(operator as NoValueOperatorEnum);
        return validNoValueOperator || validSingleOps;
    });
};

export const filterOperatorsByFieldType = (operators: KeyValueModel[], fieldType: string, isMultiple = false): KeyValueModel[] => {
    if (!operators?.length) {
        return operators;
    }
    switch (fieldType) {
        case DateTimeTypeEnum.Date:
            return filterDateOperators(operators);
        case FreeInputTypeEnum.Number:
            return filterNumberOperators(operators);
        case DropdownListTypeEnum.Boolean:
            return filterBooleanOperators(operators);
        case DropdownListTypeEnum.PickList:
            return isMultiple ? filterMultiplePicklistOperators(operators) : filterSinglePicklistOperators(operators);
        default:
            return filterFreeTextOperators(operators);
    }
};
