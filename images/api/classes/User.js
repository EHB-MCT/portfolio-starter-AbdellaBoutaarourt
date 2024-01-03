const bcrypt = require("bcryptjs");

// Made class for User
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // Hash the upcoming passwords
  async hashPassword(password) {
    this.password = await bcrypt.hash(password, 12);
  }
  // Unhash the upcoming passwords
  async unHashPassword(password) {
    return await bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;
