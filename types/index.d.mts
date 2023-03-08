export default JoseCrypto;
declare namespace JoseCrypto {
    const decryptKey: (payload?: string, privateKey?: string) => any;
    const encryptKey: (data?: string, publicKey?: string) => any;
    const generateKey: () => any;
    const encryptData: (data: any, key?: string) => string;
    const decryptData: (payload: any, key: any) => any;
}
