import { Request, Response } from "express";
import { prisma } from "../DAO/prisma";


export const inserir = (req: Request, res: Response) => {
    const { restauranteId, clienteId, data, nota, descricao } = req.body;
    prisma.avaliacao.create({
        data: {
            restauranteId,
            clienteId,
            data,
            nota,
            descricao
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
    prisma.avaliacao.findMany()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

export const buscar = (req: Request, res: Response) => {
    const { id } = req.params;
    prisma.avaliacao.findUnique({
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
    const { restauranteId, clienteId, data, nota, descricao } = req.body;
    prisma.avaliacao.update({
        where: {
            id
        },
        data: {
            restauranteId,
            clienteId,
            data,
            nota,
            descricao
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
    prisma.avaliacao.delete({
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
