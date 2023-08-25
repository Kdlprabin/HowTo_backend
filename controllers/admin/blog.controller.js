const Blog = require('../../models/blog.model');
const jwt = require('jsonwebtoken');

const createBlog = async (req, res) => {

    const { title, content, status, imageLink } = req.body;

    if (!title || !content || !status || !imageLink) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        })
    }

    if (status !== 'draft' && status !== 'published') {
        return res.status(400).json({
            success: false,
            message: 'Invalid status'
        })
    }

    res.header("Access-Control-Allow-Headers", "*");
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    token = token.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }


    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const blog = new Blog({
            title,
            content,
            imageLink,
            status,
            date: new Date(
                Date.now()
            )
        });

        await blog.save();

        return res.status(200).json({
            success: true,
            message: 'Blog created successfully',
            blog
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }

}


const getBlogs = async (req, res) => {

    try {
        const blogs = await Blog.find({ status: 'published' }).sort({ date: -1 });

        return res.status(200).json({
            success: true,
            message: 'Blogs fetched successfully',
            blogs
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }

}

const getDrafts = async (req, res) => {

    req.header("Access-Control-Allow-Headers", "*");
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }


    token = token.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }



    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const blogs = await Blog.find({ status: 'draft' }).sort({ date: -1 });

        return res.status(200).json({
            success: true,
            message: 'Blogs fetched successfully',
            blogs
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}


const getBlog = async (req, res) => {

    const { id } = req.params;

    req.header("Access-Control-Allow-Headers", "*");
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Blog fetched successfully',
            blog
        })

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
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
    createBlog,
    getBlogs,
    getDrafts,
    getBlog,
    getBlogCount,
    getDraftCount
}