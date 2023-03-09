export default Aes;
declare namespace Aes {
    export { generateKey };
    export { encrypt };
    export { decrypt };
}
declare function generateKey(): any;
declare function encrypt(data: any, key?: string): string;
declare function decrypt(payload: any, key: any): any;
