import { Request, Response } from "express";
import { prisma } from "../DAO/prisma";

export const inserir = (req: Request, res: Response) => {
    const { nome,  } = req.body;
    prisma.categoria.create({
        data: {
            nome
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
    prisma.categoria.findMany()
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
    const { nome } = req.body;
    prisma.categoria.update({
        where: {
            id
        },
        data: {
            nome
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
    prisma.categoria.delete({
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