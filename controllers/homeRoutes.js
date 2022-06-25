const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get("/", (req, res) => {
  Blog.findAll({
      include: User
  }).then(blogs => {
      const mainBlogs = blogs.map(blog => blog.get({ plain: true }))
      const loggedIn = req.session.user ? true : false
      res.render("homepage", { blogs: mainBlogs, loggedIn, username: req.session.user?.username })
  })
})

router.get("/blogs/:id", (req, res) => {
  Blog.findByPk(req.params.id, {
      include: [{
          model: Comment,
          include: [User]
      }, User],
      nest: true,
  }).then(blogData => {
      const userData = blogData.get({ plain: true })
      userData.loggedIn = req.session.user ? true : false
      userData.username = req.session.user?.username
      res.render("blog", data)
  })
})

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
