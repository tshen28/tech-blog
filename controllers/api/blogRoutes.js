const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', withAuth, async(req, res) => {
    try {
        const findBlog = await Blog.findOne({
            where: {
                id: req.params.id
            },
        });
        res.status(200).json(findBlog);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try {
        const editBlog = await Blog.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        
        if (!editBlog) {
            res.status(404).json({ message: 'No blog found with this id!'});
            return;
        }

        res.status(200).json(editBlog);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete("/:id", (req, res) => {
    Blog.destroy({
      where: {
        id: req.params.id
      }
    }).then(deleteBlog => {
      res.json(deleteBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "An error occured", err });
    });
  });

module.exports = router;