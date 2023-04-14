import { atom } from 'jotai';
export interface user {
    nome:string,
    senha:string,
    telefone:string
    id:string
    email:string
}
export const userAtom = atom< user | null>(null);
