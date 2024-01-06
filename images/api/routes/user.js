const express = require('express');
const router = express.Router();

const User = require('../classes/User.js');
const bcrypt = require('bcryptjs');

const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig.development);


const handleErrors = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error.' });
};

const validateInputs = (inputs) => {
  const { name, email, password } = inputs;
  if (!name || !email || !password) {
    throw new Error('name, email, and password are required.');
  }
};

router.use(handleErrors);

/**
 * @route GET /users
 * @desc Retrieve all user names from the database.
 */

router.get('/', async (req, res) => {
  try {
    const users = await knex.select('name').from('users');
    const usernames = users.map(user => user.name);
    res.json(usernames);
  } catch (error) {
    res.status(500).send({
      error: "something went wrong",
      value: error.stack,
    });  }
});



/**
 * @route POST /users/register
 * @desc Register a new user.
 * @returns {Object} An object containing the new user's ID.
 * @throws {Error} If there is an error in registering a new user.
 */

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    validateInputs({ name, email, password });

    const newUser = new User({ name, email, password });

    newUser.password = password;

    await newUser.hashPassword();

    const [userId] = await knex('users').insert({
      name,
      email,
      password: newUser.password,
    }, 'id');

    res.status(201).json({ userId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });

  }
});

/**
 * @route POST /login
 * @desc Login user.
 * @returns {Object} An object containing a response.
 * @throws {Error} If there is an error in the login process.
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await knex('users').where('email', email).first();

    if (!user) {
      return res.status(404).json({ error: 'No user found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });

  }
});

/**
 * @route GET /users/:id
 * @desc Retrieve user details by user ID.
 * @params {string} id - The ID of the user.
 * @returns {Object} An object containing the user details.
 * @throws {Error} If there is an error in retrieving user details.
 */

router.get('/:id', async (req, res) => {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
      }

      const user = await knex('users').where('id', userId).first();

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const { name, email,password } = user;

      const userInfo = new User({ id: userId, name, email, password});

      res.json({userInfo});
    } catch (error) {
      throw error;
    }
  });


/**
 * @route PUT /users/:id
 * @desc Update user details (email and/or password) by user ID.
 * @body {string} email - The new email for the user (optional).
 * @body {string} password - The new password for the user (optional).
 * @body {string} confirmPassword - The confirmation of the new password.
 * @returns {Object} An object indicating the success of the update.
 * @throws {Error} If there is an error in updating user details.
 */

router.put('/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email, password } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
      }

      const user = await knex('users').where('id', userId).first();

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      if (name) {
        user.name = name;
      }

      if (email) {
        const emailExists = await knex('users').where('email', email).andWhereNot('id', userId).first();
        if (emailExists) {
          return res.status(400).json({ error: 'Email is already in use by another user.' });
        }

        user.email = email;
      }

      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      await knex('users').where('id', userId).update({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      res.json({ message: 'User details updated successfully.' });
    } catch (error) {
      throw error;
    }
  });

/**
 * @route DELETE /users/:id
 * @desc Delete user by user ID.
 * @params {string} id - The ID of the user.
 * @returns {Object} An object indicating the success of the deletion.
 * @throws {Error} If there is an error in deleting the user.
 */

router.delete('/:id', async (req, res) => {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
      }

      const userExists = await knex('users').where('id', userId).first();
      if (!userExists) {
        return res.status(404).json({ error: 'User not found.' });
      }

      await knex('users').where('id', userId).del();

      res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      throw error;
    }
  });

module.exports = router;
