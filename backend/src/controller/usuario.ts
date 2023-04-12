import { Request, Response } from "express";
import { prisma } from "../DAO/prisma";


export const login = (req: Request, res: Response) => {
    const { email, senha } = req.body;
    prisma.user.findUnique({
        where: {
            email
        }
    })
        .then((data) => {
            if (data) {
                if (data.senha === senha) {
                    res.status(200).json(data);
                } else {
                    res.status(401).json({ message: "Senha incorreta" });
                }
            } else {
                res.status(404).json({ message: "Usuário não encontrado" });
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}


export const inserir = (req: Request, res: Response) => {
    const { email, nome, telefone, senha } = req.body;
    prisma.user.create({
        data: {
            nome,
            email,
            telefone,
            senha
        }
    })
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

export const listar = (req: Request, res: Response) => {
    prisma.user.findMany()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

export const buscar = (req: Request, res: Response) => {

    const { id } = req.params;
    prisma.user.findUnique({
        where: {
            id
        }
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

export const atualizar = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, email, telefone, senha } = req.body;
    prisma.user.update({
        where: {
            id
        },
        data: {
            nome,
            email,
            telefone,
            senha
        }
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

export const deletar = (req: Request, res: Response) => {
    const { id } = req.params;
    prisma.user.delete({
        where: {
            id
        }
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}