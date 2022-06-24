const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get("/", (req, res) => {
  Blog.findAll({
      include: User
  }).then(blogs => {
      console.log(blogs)
      const mainBlogs = blogs.map(blog => blog.get({ plain: true }))
      console.log("==========")
      const loggedIn = req.session.user ? true : false
      res.render("/", { blogs: mainBlogs, loggedIn, username: req.session.user?.username })
  })
})

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", (req, res) => {
  if (!req.session.user) {
      return res.redirect("/login")
  }
  User.findByPk(req.session.user.id, {
      include: [Blog]
  }).then(userData => {
      console.log(userData);
      const hbsData = userData.get({ plain: true })
      hbsData.loggedIn = req.session.user ? true : false
      res.render("profile", hbsData)
  })
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('signup');
})

module.exports = router;
