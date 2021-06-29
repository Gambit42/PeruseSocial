const userModel = require("../models/user");

exports.compose = async (req, res, next) => {
  const { bookTitle, bookThoughts } = req.body;
  const image = req.file.filename;

  try {
    const book = await userModel.findOneAndUpdate(
      { _id: req.session.userId },
      {
        $push: {
          books: {
            bookImage: image,
            bookTitle: bookTitle,
            bookThoughts: bookThoughts,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteBook = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const book = await userModel.findOneAndUpdate(
      { _id: req.session.userId },
      {
        $pull: {
          books: {
            _id: _id,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSpecificThought = async (req, res) => {
  const { thoughtID } = req.params;
  const book = await userModel.findOne(
    { books: { $elemMatch: { _id: thoughtID } } },
    { email: 1, books: { $elemMatch: { _id: thoughtID } } }
  );

  res.status(200).json({
    data: book,
  });
};
