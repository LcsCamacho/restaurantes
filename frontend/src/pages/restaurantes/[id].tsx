import { GetServerSideProps } from 'next'
import axios from 'axios';
import { Restaurante } from '../home';
import { useEffect, useState } from 'react';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    let id = ''
    if (params) {
        id = params.id as string
    }
    const restaurante = await axios.get(`http://localhost:3777/restaurante/${id}`)
    const strRestaurante = JSON.stringify(restaurante.data)
    return {
        props: {
            strRestaurante
        }
    }
}

export default function Restaurante({ strRestaurante }: { strRestaurante: string }) {
    const [showCardapio, setShowCardapio] = useState<boolean>(true)
    const [restaurante, setRestaurante] = useState<Restaurante>(JSON.parse(strRestaurante) as Restaurante)
    const [nota, setNota] = useState<number>(0)

    useEffect(() => {
        const nota = restaurante.Avaliacao?.reduce((acc, avaliacao) => {
            return acc + avaliacao.nota
        }, 0) || 0
        setNota(nota)
    }, [restaurante])

    return (

        <>
            <div className='min-h-screen flex flex-col bg-orange-200 w-screen'>
                <header className='p-5 justify-center items-center bg-orange-400 h-1/5 flex gap-5 flex-col text-lg '>
                    <h1>Descrição do Restaurante    </h1>
                    <h1>Nome: {restaurante.nome}</h1>
                    <h1>Endereço: {restaurante.endereco}</h1>
                    <h1>Nota: {nota}</h1>
                </header>
                <main className='bg-orange-400 h-4/5'>
                    <div className="flex text-lg p-5 flex-col gap-2">
                        <h1 onClick={() => setShowCardapio(!showCardapio)} className='flex p-4 cursor-pointer px-10 border justify-between transition-all  hover:bg-white' >Cardápio <span>{showCardapio ? "-" : "+"}</span></h1>
                        {showCardapio && (
                            <>
                                <div className="cardapio grid grid-cols-3 p-10 gap-4">
                                    {restaurante.Cardapio?.map((item, index) => {
                                        const desc = item.descricao.split('-')
                                        return (
                                            <div key={index} className="flex flex-col gap-2 p-5 cursor-pointer transition-all hover:scale-105 bg-white rounded-lg shadow-md hover:shadow-lg">
                                                <span className='text-black'>{desc[0]}</span>
                                                <div className="ingredientes">
                                                    {desc.map((ingrediente, index) => {
                                                        if (index !== 0) {
                                                            return (
                                                                <span key={index} className='text-slate-950 hover:underline'>{ingrediente}</span>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                                <span className='text-gray-500 font-small'>R$:{item.valor}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </>
    )
}