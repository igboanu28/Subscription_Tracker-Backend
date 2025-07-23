import express from 'express';

import { PORT  } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToMongoDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

// error handling middleware
app.use(errorMiddleware);

// arcjet middleware
app.use(arcjetMiddleware)

app.get ('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    await connectToMongoDB();
});

export default app;