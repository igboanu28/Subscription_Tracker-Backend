import Subscription from "../models/subscription.model.js"

export const createSubscription = async (req, res, next) => {
    try{
        const newSubscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        res.status(201).json({
            sussess: true,
            message: "Subscription created successfully",
            data: newSubscription
        })

    }
    catch (e)
    {
        next(e);
    }
}

