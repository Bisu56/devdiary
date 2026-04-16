import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
};

const io = new Server(httpServer, {
  cors: corsOptions,
});

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
  res.json({ message: '✅ DevDiary Backend is running!' });
});

import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';
import commentRoutes from './routes/commentRoutes';
import uploadRoutes from './routes/uploadRoutes';

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/upload', uploadRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-post', (postId) => {
    socket.join(`post-${postId}`);
  });

  socket.on('new-comment', (data) => {
    io.to(`post-${data.postId}`).emit('comment-added', data.comment);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});