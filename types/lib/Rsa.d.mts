export default Rsa;
declare namespace Rsa {
    export { generateKey };
    export { encrypt };
    export { decrypt };
}
declare function generateKey(): Promise<any>;
declare function encrypt(data?: string, publicKey?: string): any;
declare function decrypt(payload?: string, privateKey?: string): any;
