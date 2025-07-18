import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.proctect(req);

        if (decision.isDenied())
        {
            if (decision.isRateLimited()) 
            {
                return res.status(429).json({
                    message: 'Too many requests, please try again later.'
                });
            }
            if (decision.isBot()) 
            {
                return res.status(403).json({
                    message: 'Access denied for bots.'
                });
            }
            return res.status(403).json({
                message: 'Access denied.'
            });
        }

        next();
    }
    catch (error) {
        console.log(`Arcjet middleware error: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;