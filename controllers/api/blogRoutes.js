const router = require('express').Router();
const { Blog } = require('../../models');

router.post("/", (req, res) => {
    if(!req.session.user){
      return res.status(401).json({msg:"Login to create blog."})
  }
    Blog.create({
      title:req.body.title,
      body:req.body.body,
      UserId:req.session.user.id
    })
      .then(newBlog => {
        res.json(newBlog);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error occured", err });
      });
});

router.get("/:id", (req, res) => {
    Blog.findByPk(req.params.id,{})
      .then(dbBlog => {
        res.json(dbBlog);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error occured", err });
      });
});

router.put("/:id", (req, res) => {
    Blog.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatedBlog => {
      res.json(updatedBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "An error occured", err });
    });
});

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