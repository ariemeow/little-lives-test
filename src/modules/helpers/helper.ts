import { sign, verify } from 'jsonwebtoken';

const SALT = process.env.SALT || 'initokenrahasia1234';

const encode = (obj: object): string => {

    return sign(obj, SALT);
}

const decode = (str: string): object => {

    return verify(str, SALT);
}

const convertToUnixTimestamp = (dt: Date): number => {

    return Math.floor(dt.getTime() / 1000);
}

const formatDate = (dt) => {

    return `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2,'0')}-${dt.getDate().toString().padStart(2,'0')}`;
}

const getTimeFromUnixTimestamp = (num: number): string => {

    const dt = new Date(num * 1000);

    return `${dt.getHours().toString().padStart(2,'0')}:${dt.getMinutes().toString().padStart(2,'0')}`;
}

export default { encode, decode, convertToUnixTimestamp, getTimeFromUnixTimestamp, formatDate };
