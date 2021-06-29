exports.session = async (req, res, next) => {
  if (req.session.userId) {
    return res.json({
      isAuth: true,
      message: "You are logged in",
      data: req.session,
    });
  }
  return res.json({
    isAuth: false,
    message: "Not logged in",
    data: req.session,
  });
};

exports.endSession = async (req, res, next) => {
  req.session.destroy();
  res.json({
    auth: false,
  });
};
