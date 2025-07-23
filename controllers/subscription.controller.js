import Subscription from "../models/subscription.model.js"
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    try{
        const newSubscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId :newSubscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        });

        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: { newSubscription, workflowRunId }
        });
    }
    catch (e)
    {
        next(e);
    }
}

export const getUserSubscription = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id)
        {
            const error = new Error("You are not authorized to view this subscription");
            error.status = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.params.id});
        
        res.status(200).json({
            success: true,
            data: subscriptions
        });
    }
    catch (e) {
        next(e);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try{
        const allSubscriptions = await Subscription.find();
        res.status(200).json({
            success: true,
            message: "All subscriptions retrieved successfully",
            data: allSubscriptions
        });
    }
    catch (e){
        next(e);
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription)
        {
            const error = new Error("Subscription not found");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Subscription details retrieved successfully",
            data: subscription
        });
    }
    catch (e) {
        next(e);
    }
}