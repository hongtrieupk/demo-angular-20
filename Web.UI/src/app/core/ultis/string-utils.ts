export function toUpperFirstChar(text: string | undefined): string | undefined {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
}
export function isEmptyGuid(guid: string): boolean {
    return guid === '00000000-0000-0000-0000-000000000000';
}
