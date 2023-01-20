import { v4 as uuidv4 } from 'uuid';

export function Sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function GenerateUUID() {
    return uuidv4();
}

