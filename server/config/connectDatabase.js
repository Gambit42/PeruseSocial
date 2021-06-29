const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log("Successfully connected to the MongoDB database");
};

module.exports = connectDatabase;
