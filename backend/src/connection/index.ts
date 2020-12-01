import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://adm_jr:juniorjunior@cluster0-xage2.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
