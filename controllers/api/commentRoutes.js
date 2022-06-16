const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:blog_id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            blog_id: req.params.blog_id,
        });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;