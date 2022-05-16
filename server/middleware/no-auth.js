module.exports = async (req, res, next) => {
  const sessionUser = req.sesseion.user;
  if (sessionUser) {
    return res.redirect("/");
  }
  next();
};
