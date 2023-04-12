import { Request, Response } from "express";
import { prisma } from "../DAO/prisma";

export const inserir = (req: Request, res: Response) => {
    const { restauranteId, descricao, valor } = req.body;

    prisma.cardapio.create({
        data: {
            restauranteId,
            descricao,
            valor
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

    prisma.cardapio.findMany()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

export const buscar = (req: Request, res: Response) => {
    const { id } = req.params;

    prisma.cardapio.findUnique({
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
    const { restauranteId, descricao, valor } = req.body;

    prisma.cardapio.update({
        where: {
            id
        },
        data: {
            restauranteId,
            descricao,
            valor
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
    prisma.cardapio.delete({
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
