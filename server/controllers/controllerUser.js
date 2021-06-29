const userModel = require("../models/user");

exports.getCurrentUser = async (req, res, next) => {
  const user = await userModel.findById(req.session.userId);
  try {
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

exports.getUser = async (req, res, next) => {
  const { userName } = req.params;
  const user = await userModel.findOne({ userName });
  try {
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(404).json({ success: false, error: error });
  }
};

exports.updateUser = async (req, res, next) => {
  const { userName } = req.body;
  const image = req.file.filename;
  const registeredUsername = await userModel.findOne({ userName });
  const registeredUserData = await userModel.findById(req.session.userId);
  // if (userName === registeredUserData.userName) {
  //   return res.status(401).json({
  //     success: false,
  //     error: "You already have that username.",
  //   });
  // }
  if (registeredUsername) {
    return res.status(401).json({
      success: false,
      error: "Username is already taken.",
      data: registeredUsername.userName,
      dataTwo: registeredUserData.userName,
    });
  }
  try {
    await userModel.findOneAndUpdate(
      { _id: req.session.userId },
      { userName: userName, image: image },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Username is updated." });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};
