export interface ErrorModel {
    message: string;
    code: number;
}
export interface ExtendedErrorModel {
    message: string;
    code: number;
    rootCause: string;
}
