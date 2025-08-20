import { BetweenOperatorEnum, MultipleValueOperatorEnum } from '../condition-form/enum/operator.enum';
import { compareString, isNotEmptyArray } from './array.util';
export const EMPTY_VALUE = '';
export interface KeyValueModel {
    id: string;
    value: string;
}
export class VisibilityCondition {
    id: string;
    field: string;
    fieldDisplay: string;
    operator: string;
    operatorDisplay: string;
    value: string; // for single value conditions
    values: string[]; // for multiple and between condition
    connector: string;
    connectorId: string;
    conditions: VisibilityCondition[]; // sub conditions
    isValid: boolean;

    public constructor() {
        this.id = EMPTY_VALUE;
        this.field = EMPTY_VALUE;
        this.fieldDisplay = EMPTY_VALUE;
        this.operatorDisplay = EMPTY_VALUE;
        this.connectorId = EMPTY_VALUE;
        this.operator = EMPTY_VALUE;
        this.values = [];
        this.value = EMPTY_VALUE;
        this.conditions = [];
        this.isValid = false;
        this.connector = EMPTY_VALUE;
    }

    public get valueDisplay(): string {
        if (Object.values(MultipleValueOperatorEnum).includes(this.operator as MultipleValueOperatorEnum)
            || this.operator === BetweenOperatorEnum.Between) {
            const combineCharacter = this.operator === BetweenOperatorEnum.Between ? ' -' : ',';
            return this.values.reduce((accumulator, currentValue) => `${accumulator}${combineCharacter} ${currentValue}`);
        }
        return this.value ?? EMPTY_VALUE;
    }

    public get getDisplayCondition(): string {
        return `${this.fieldDisplay} ${this.operatorDisplay} ${this.valueDisplay}`;
    }

    public hasInValidDateTimeRange(): boolean {
        // Between only apply for dateTime data type
        if (this.operator !== BetweenOperatorEnum.Between || this.values.length < 2
            || isNaN(Date.parse(this.values[0])) || isNaN(Date.parse(this.values[1]))) {
            return false;
        }
        const fromDate = new Date(this.values[0]);
        const toDate = new Date(this.values[1]);
        return toDate <= fromDate;
    }
}

function compareCondition(a: VisibilityCondition, b: VisibilityCondition): number {
    return compareString(a.id, b.id);
}

// the return fields must be the as the ones in the VisibilityCondition constructor
function toSimpleCondition(x: VisibilityCondition): any {
    const condition = {
        id: x.id,
        field: x.field,
        operator: x.operator,
        value: x.value ?? EMPTY_VALUE,
        values: x.values ?? [],
        connector: x.connector,
        conditions: isNotEmptyArray(x.conditions) ? x.conditions.map(toSimpleCondition) : []
    };
    condition.conditions.sort(compareCondition);
    return condition;
}

export function isConditionsValid(conditions: VisibilityCondition[] | undefined): boolean {
    if (!conditions) {
        return true;
    }
    for (let i = 0; i < conditions.length; i++) {
        if (!conditions[i].isValid) {
            return false;
        }
        // skip validate connector for root condition (index - 0)
        if (i !== 0 && !conditions[i].connector) {
            return false;
        }
        if (conditions[i].conditions?.length) {
            if (!isConditionsValid(conditions[i].conditions)) {
                return false;
            }
        }
    }
    return true;
}

export function isConditionsChanged(current: VisibilityCondition[], update: VisibilityCondition[] | undefined): boolean {
    if (!update) {
        return false;
    }
    const changeConditions = update.map(toSimpleCondition);
    const currentConditions = current.map(toSimpleCondition);
    changeConditions.sort(compareCondition);
    currentConditions.sort(compareCondition);
    return JSON.stringify(changeConditions) !== JSON.stringify(currentConditions);
}
// to avoid 'Cannot assign to read only property' error
export function cloneConditions(conditions: VisibilityCondition[]): VisibilityCondition[] {
    return conditions.map(cond => {
        const mapCond = Object.assign(new VisibilityCondition(), cond);
        mapCond.conditions = isNotEmptyArray(mapCond.conditions) ? cloneConditions(mapCond.conditions) : [];
        return mapCond;
    });
}
