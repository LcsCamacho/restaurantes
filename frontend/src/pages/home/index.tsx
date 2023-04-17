import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import { useAxios } from '@/hooks/useAxios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import router from 'next/router';
import { User, useUserStore } from '@/features/zustand/userStore';

export type Categoria = {
    id: string,
    nome: string
}

export type Restaurante = {
    id: string,
    nome: string,
    endereco: string,
    categoriaId: string,
    categoria: Categoria
    Cardapio?: {
        id: string,
        descricao: string,
        valor: number,
        restauranteId: string
    }[]
    Avaliacao?: {
        id: string,
        nota: number,
        descricao: string,
        restauranteId: string
        clienteId: string
    }[]
}


export default function Home() {
    const { api } = useAxios();
    const [userState, setUserState] = useState<User>({} as User);
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user]);

    const logout = () => {
        setUser(null);
        router.push('/');
    }

    useEffect(() => {
        setUserState(user as User)
    }, [user]);

    async function fetchCategorias(): Promise<Categoria[]> {
        const response = await api.get('/categoria');
        return response.data;
    }

    async function fetchRestaurante(): Promise<Restaurante[]> {
        const response = await api.get('/restaurante');
        return response.data;
    }

    const { data, error, isLoading } = useQuery('restaurantes-categorias', async () => {
        const [categorias, restaurantes] = await Promise.all([fetchCategorias(), fetchRestaurante()]);

        return { categorias, restaurantes };
    });

    if (isLoading) {
        return <div>Carregando...</div>
    }

    if (error) {
        return <div>Erro ao carregar</div>
    }

    const redirectToRestaurantePage = (id: string) => {
        router.push(`/restaurantes/${id}`);
    }

    return (
        <>
            <header className='flex p-10 justify-center items-center'>
                <span>
                    Bem vindo {user?.nome}
                </span>
                <span className='text-md cursor-pointer hover:scale-110 p-3' onClick={logout}>Logout</span>
            </header>

            <main>
                <div className="descriptions flex flex-col gap-2 text-center">
                    <h1>Restaurantes</h1>
                    <span>Disponíveis: {data ? data.restaurantes.length : 0}</span>
                    <span>Agora é so clicar no restaurante de sua preferencia!</span>
                </div>
                <div className="restaurants p-2">
                    <div className="flex flex-col border border-slate-950 border-solid gap-2 p-5">
                        {data?.categorias.map((categoria: Categoria) => {
                            return (
                                <div key={categoria.id} className="flex flex-col gap-2">
                                    <h2>{categoria.nome}</h2>
                                    <div className="flex gap-5 shadow-lg p-5">
                                        {data.restaurantes.map((restaurante: Restaurante) => {
                                            if (restaurante.categoriaId === categoria.id) {
                                                return (
                                                    <div onClick={() => redirectToRestaurantePage(restaurante.id)} key={restaurante.id}
                                                        className="flex flex-col border rounded-lg gap-2 p-5 transition-all bg-green-400 hover:bg-white cursor-pointer hover:scale-110 ">
                                                        <span>{restaurante.nome}</span>
                                                        <span>{restaurante.endereco}</span>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
        </>
    )
}