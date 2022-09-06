import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
  },
  lastLoginAt: {
    type: Number
  },

});

export default mongoose.model('account', AccountSchema);