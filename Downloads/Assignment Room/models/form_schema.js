const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  assignment_name: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  manager_email: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  applicants: {
    type: Array,
    required: false,
  },
  user_fav: {
    type: Array,
  },
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
