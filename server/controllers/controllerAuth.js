const userModel = require("../models/user");

exports.register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const registeredUserEmail = await userModel.findOne({ email });
  const registeredUserUsername = await userModel.findOne({ userName });

  // if (registeredUserEmail && registeredUserEmail) {
  //   return res.status(401).json({
  //     success: false,
  //     error: {
  //       userName: "Username is already taken.",
  //       email: "Email is already taken.",
  //     },
  //   });
  // }

  if (registeredUserEmail) {
    if (registeredUserUsername) {
      return res.status(401).json({
        success: false,
        error: {
          userName: "Username is already taken.",
          email: "Email is already taken.",
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        error: {
          userName: "",
          email: "Email is already taken",
        },
      });
    }
  }

  if (registeredUserUsername) {
    return res.status(401).json({
      success: false,
      error: {
        userName: "Username is already taken.",
        email: "",
      },
    });
  }

  try {
    const user = await userModel.create({
      userName,
      email,
      password,
    });

    user.save();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if ((!email && !userName) || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide email and password." });
  }

  try {
    const user = await userModel
      .findOne({ $or: [{ userName }, { email }] })
      .select("+password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, error: "invalid credentials." });
    }

    req.session.userId = user._id;
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
