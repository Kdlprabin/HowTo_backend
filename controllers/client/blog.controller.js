const Blog = require('../../models/blog.model');

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ status: 'published' }).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const getBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getBlogCount = async (req, res) => {
    try {
        const count = await Blog.countDocuments({ status: 'published' });
        res.status(200).json(count);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDraftCount = async (req, res) => {
    try {
        const count = await Blog.countDocuments({ status: 'draft' });
        res.status(200).json(count);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getBlogs,
    getBlog,
    getBlogCount,
    getDraftCount
}