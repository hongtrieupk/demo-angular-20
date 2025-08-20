import { MetadataGridOption } from './metadata-grid-option';
import { KeyValueModel, VisibilityCondition } from './visibility-condition.model';

export interface ConditionModalData {
  condition: VisibilityCondition;
  fields: FieldCondition[];
}

export interface MetadataGroup {
  id: string;
  name: string;
  fields: FieldCondition[];
}

export interface FieldCondition extends KeyValueModel {
  id: string;
  value: string; // field name
  type: string;
  values: string[]; // list values to fill in the dropdown list options
  operators: KeyValueModel[];
  multiple: boolean;
}

export const fieldConditionToMetadataGridOption = (obj: FieldCondition): MetadataGridOption => {
  return {
    value: obj.id,
    label: obj.value,
    selected: false,
    edited: false
  };
};


export const MetadataGroupToGridOption = (obj: MetadataGroup): MetadataGridOption => {
  return {
    value: obj.id,
    label: obj.name,
    selected: false,
    edited: true
  };
};

