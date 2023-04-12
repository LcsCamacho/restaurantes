import { Request, Response } from "express";
import { prisma } from "../DAO/prisma";

export const inserir = (req: Request, res: Response) => {
    const { nome, endereco, categoriaId } = req.body;

    prisma.restaurante.create({
        data: {
            nome,
            categoriaId,
            endereco
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

    prisma.restaurante.findMany({
        include: {
            categoria: true
        }
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

export const buscar = (req: Request, res: Response) => {
    const { id } = req.params;

    prisma.restaurante.findUnique({
        where: {
            id
        },
        include: {
            categoria: true,
            Avaliacao: true,
            Cardapio: true
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
    const { nome, endereco, categoriaId } = req.body;

    prisma.restaurante.update({
        where: {
            id
        },
        data: {
            nome,
            endereco,
            categoriaId
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
    prisma.restaurante.delete({
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
