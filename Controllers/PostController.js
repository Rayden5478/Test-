const pool = require('../db');  // Импортируем объект pool для работы с базой данных

class PostController {

    // Получение всех постов
    async getAllPosts(req, res) {
        try {
            const result = await pool.query('SELECT * FROM posts');
            res.json(result.rows);
        } catch (error) {
            console.error('Error getting posts:', error);
            res.status(500).json({ message: 'Server error, unable to fetch posts.' });
        }
    }

    // Создание нового поста
    async createPost(req, res) {
        const { user_id, title, body } = req.body;
        try {
            const result = await pool.query(
                'INSERT INTO posts (user_id, title, body) VALUES ($1, $2, $3) RETURNING *',
                [user_id, title, body]
            );
            res.json(result.rows[0]);  // Возвращаем созданный пост
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Server error, unable to create post.' });
        }
    }

    // Получение поста по ID
    async getPostById(req, res) {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
            const post = result.rows[0];
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);  // Возвращаем пост по ID
        } catch (error) {
            console.error('Error getting post:', error);
            res.status(500).json({ message: 'Server error, unable to fetch post.' });
        }
    }

    // Обновление поста
    async updatePost(req, res) {
        const { id } = req.params;
        const { title, body } = req.body;
        try {
            const result = await pool.query(
                'UPDATE posts SET title = $1, body = $2 WHERE id = $3 RETURNING *',
                [title, body, id]
            );
            const updatedPost = result.rows[0];
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(updatedPost);  // Возвращаем обновлённый пост
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ message: 'Server error, unable to update post.' });
        }
    }

    // Удаление поста
    async deletePost(req, res) {
        const { id } = req.params;
        try {
            const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
            const deletedPost = result.rows[0];
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json({ message: 'Post deleted successfully' });  // Успешно удалён
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ message: 'Server error, unable to delete post.' });
        }
    }
}

module.exports = new PostController();