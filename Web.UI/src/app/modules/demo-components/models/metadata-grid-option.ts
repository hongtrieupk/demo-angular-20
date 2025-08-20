export interface MetadataGridOption {
    value: string;
    label: string;
    selected: boolean;
    edited: boolean;
    index?: number;
}

export interface PersonalizedViewsModel {
    syncTileToList: boolean;
    selectedMetadataList?: MetadataGridOption[];
    selectedMetadataTile?: MetadataGridOption[];
}
