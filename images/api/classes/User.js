const bcrypt = require("bcryptjs");

// Made class for User
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Hash the upcoming passwords
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    } else {
      throw new Error('Password is required before hashing.');
    }
  }
  // Unhash the upcoming passwords
  async unHashPassword(password) {
    return await bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;
