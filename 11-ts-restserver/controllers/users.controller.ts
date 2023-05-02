import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();

    res.json({ users });
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).json({
            msg: `The user ${id} does not exist`
        });
    }

    res.json({ user });
};

export const postUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {

        const emailExist = await User.findOne({
            where: {
                email: body.email  
            } 
        });

        if (emailExist) {
            return res.status(400).json({
                msg: `email ${body.email} already exist`
            })
        }

        const user = User.build(body);
        await user.save();

        res.json({ user });
        
    } catch (error) {
        res.status(500).json({
            msg: `Talk to admin`
        })
    }
};

export const putUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req.body;

    try {

        const user = await User.findByPk(id);

        if (!user) {
            res.status(404).json({
                msg: `The user ${id} does not exist`
            });
        }

        await user?.update(body);

        res.json({ user });
        
    } catch (error) {
        res.status(500).json({
            msg: `Talk to admin`
        })
    }

    res.json({
        msg: 'putUser',
        id: id,
        data: body,
    });
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).json({
            msg: `The user ${id} does not exist`
        });
    }

    await user?.update({ status: false });
    //await user?.destroy();

    res.json({ user });
};