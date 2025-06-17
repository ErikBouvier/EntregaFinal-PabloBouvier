import User from "../models/user.js";

class UserRepository {
  async findById(id, includePassword = false) {
    const selectFields = includePassword ? "" : "-password";
    return User.findById(id).select(selectFields);
  }
  async findByEmail(email) {
    return User.findOne({ email });
  }
  async create(userData) {
    return User.create(userData);
  }
  async updatePassword(id, newPassword) {
    return User.findByIdAndUpdate(id, { password: newPassword }, { new: true });
  }
  async findAll() {
    return User.find().select("-password");
  }
}

export default new UserRepository();
