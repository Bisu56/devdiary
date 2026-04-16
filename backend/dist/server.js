"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const corsOptions = {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
};
const io = new socket_io_1.Server(httpServer, {
    cors: corsOptions,
});
const PORT = process.env.PORT || 5000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.get('/', (req, res) => {
    res.json({ message: '✅ DevDiary Backend is running!' });
});
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
app.use('/api/posts', postRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/comments', commentRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
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
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));
httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
