export default class JoseCryptoError extends Error {
    constructor(e: {}, eMap: any);
    _isCustomError: boolean;
    _isJoseCryptoError: boolean;
    service: string;
    message: any;
    statusCode: any;
    errorCode: any;
    error: {};
}
