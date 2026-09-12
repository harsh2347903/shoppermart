const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// A schema describes the shape of documents stored in the "users" collection.
// Mongoose uses it to validate data before it ever reaches MongoDB.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      lowercase: true,
      unique: true // MongoDB will reject a second user with the same email
    },
    password: { type: String, required: [true, 'password is required'], minlength: 6, select: false },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
  },
  {
    // timestamps automatically adds and maintains createdAt / updatedAt fields
    timestamps: true
  }
);



userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// mongoose.model('User', userSchema) creates a "User" model.
// Mongoose pluralizes and lowercases the name to get the collection: "users".
module.exports = mongoose.model('User', userSchema);
