import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import ReactModal from 'react-modal';

interface CadastroFormProps {
    showModal: boolean;
    onRequestClose: () => void;
}

export default function CadastroForm({ showModal, onRequestClose }: CadastroFormProps) {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { api } = useAxios();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (senha !== confirmPassword) {
            alert('Senhas não conferem');
            return;
        }

        const usuario = {
            email,
            nome,
            telefone,
            senha,
        }

        api.post('/usuario', usuario)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })

    };

    return (
        <>
            <ReactModal
                ariaHideApp={false}
                isOpen={showModal}
                className="fixed z-10 inset-20 rounded-md overflow-y-auto bg-white flex items-center justify-center"
                overlayClassName="fixed z-10 inset-0 bg-black bg-opacity-50 justify-start items-center"
                onRequestClose={onRequestClose}>
                <form onSubmit={handleSubmit} className="w-full flex-col flex justify-center items-center bg-purple-500 shadow-lg p-5 rounded-md max-w-sm">
                    <h1 className='text-lg text-white mb-3'>Formulario de cadastro</h1>


                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
                                Email
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input autoComplete='email'
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="username" type="email" placeholder="Seu email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                    </div>


                    <div className='.md:flex .md:items-center mb-6'>
                        <div className="md:w-1/3">
                            <label className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="name">
                                Nome
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input autoComplete='name'
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="name" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" />
                        </div>
                    </div>

                    <div className='.md:flex .md:items-center mb-6'>
                        <div className="md:w-1/3">
                            <label className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="phone">
                                Telefone
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input autoComplete='phone'
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="phone" type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Seu telefone" />
                        </div>
                    </div>


                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
                                Senha
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input autoComplete='current-password'
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="password" type="password" placeholder="Sua senha" onChange={(e) => setSenha(e.target.value)} value={senha} />
                        </div>
                    </div>


                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-white  font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
                                Confirmar Senha
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input autoComplete='current-password'
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="confirmPassword" type="password" placeholder="Sua senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                        </div>
                    </div>
                    {senha !== confirmPassword && <p className='text-red-500'>Senhas não conferem</p>}


                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button type="submit" className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                Entrar
                            </button>
                        </div>
                    </div>


                </form>
            </ReactModal>

        </>
    )
}