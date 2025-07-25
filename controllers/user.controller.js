import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        });
    }
    catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User details retrieved successfully",
            data: user
        });
    }
    catch (error) {
        next(error);
    }
}

export const editUser = async (req, res, next) => {
    try{
        if (req.user.id !== req.params.id)
        {
            const error = new Error("You are not authorized to edit user");
            error.status = 401;
            throw error;
        }
        
        const { name, email } = req.body;
        const updates = { name, email };

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true
            }
        ).select('-password');
        
        if (!updatedUser)
        {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User edited",
            data: updatedUser
        });
    }
    catch (e)
    {
        next(e);
    }
}