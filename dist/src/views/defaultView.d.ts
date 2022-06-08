export declare class DefaultView {
    static success(message: string): {
        success: string;
    };
    static error(error: string): {
        error: string;
    };
    static manyErrors(messages: string[] | string): {
        error: string[];
    } | {
        error: string;
    };
}
