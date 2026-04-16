"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.getCommentsForPost = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const getCommentsForPost = async (req, res) => {
    try {
        const comments = await Comment_1.default.find({ post: req.params.postId })
            .populate('author', 'name email')
            .sort({ createdAt: 1 });
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getCommentsForPost = getCommentsForPost;
const addComment = async (req, res) => {
    try {
        const { content, parentComment } = req.body;
        const postId = req.params.postId;
        const comment = new Comment_1.default({
            post: postId,
            author: req.user.id,
            content,
            parentComment: parentComment || null,
        });
        await comment.save();
        await comment.populate('author', 'name');
        res.status(201).json(comment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addComment = addComment;
