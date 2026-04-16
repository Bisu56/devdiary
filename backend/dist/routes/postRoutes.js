"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', postController_1.getAllPosts);
router.get('/:slug', postController_1.getPostBySlug);
router.post('/', auth_1.protect, postController_1.createPost);
exports.default = router;
