import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface User {
    id: string;
    email: string;
    nome: string;
    telefone: string;
    senha: string;
}

interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user:User | null) => set({ user }),
        }),
        { name: 'user', getStorage: () => localStorage }
    )
);
