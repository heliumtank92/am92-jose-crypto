export namespace RSA_CONSTANTS {
    const ALGOGRITHM: string;
    namespace OPTIONS {
        const padding: any;
        const oaepHash: string;
    }
    const PLAIN_TEXT_FORMAT: string;
    const CIPHER_TEXT_FORMAT: string;
    namespace KEY_OPTIONS {
        const modulusLength: number;
    }
}
export namespace AES_CONSTANTS {
    export const ALGORITHM: string;
    export const KEY_FORMAT: string;
    export { AES_KEY_LENGTH as KEY_LENGTH };
    export { AES_KEY_STRING_LENGTH as KEY_STRING_LENGTH };
    export const IV_FORMAT: string;
    export const IV_LENGTH: number;
    const PLAIN_TEXT_FORMAT_1: string;
    export { PLAIN_TEXT_FORMAT_1 as PLAIN_TEXT_FORMAT };
    const CIPHER_TEXT_FORMAT_1: string;
    export { CIPHER_TEXT_FORMAT_1 as CIPHER_TEXT_FORMAT };
    export const AUTH_TAG_LENGTH: number;
    export const DATA_SEPARATOR: string;
}
declare const AES_KEY_LENGTH: 32;
declare const AES_KEY_STRING_LENGTH: number;
export {};
