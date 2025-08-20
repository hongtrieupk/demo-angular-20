export enum SingleValueOperatorEnum {
    Equal = 'eq',
    NotEqual = 'noteq',
    GreaterThan = 'gt',
    GreaterThanEqual = 'gte',
    LessThan = 'lt',
    LessThanEqual = 'lte',
    Like = 'like',
    NotLike = 'notlike'
}

export enum BetweenOperatorEnum {
    Between = 'between'
}

export enum NoValueOperatorEnum {
    IsNull = 'isnull',
    IsNotNull = 'notnull'
}

export enum MultipleValueOperatorEnum {
    In = 'in',
    NotIn = 'notin'
}

export enum JoinOperatorEnum {
    And = 'and',
    Or = 'or'
}
