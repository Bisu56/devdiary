"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.createPost = exports.getPostBySlug = exports.getAllPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post_1.default.find({ published: true })
            .sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllPosts = getAllPosts;
const getPostBySlug = async (req, res) => {
    try {
        const post = await Post_1.default.findOne({
            slug: req.params.slug,
            published: true
        });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getPostBySlug = getPostBySlug;
const createPost = async (req, res) => {
    try {
        const { title, content, tags, published = false } = req.body;
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-');
        const newPost = new Post_1.default({
            title,
            slug,
            content,
            tags: tags || [],
            published,
            author: req.user.id,
        });
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createPost = createPost;
const deletePost = async (req, res) => {
    try {
        const post = await Post_1.default.findOneAndDelete({
            _id: req.params.id,
            author: req.user.id
        });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deletePost = deletePost;
