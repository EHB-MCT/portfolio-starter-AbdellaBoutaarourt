const express = require("express");
const router = express.Router();

const Anime = require("../classes/Anime");

const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig.development);

/**
 * Gets all the animes from the API
 * @returns return array - objects that contain : userId , animeName , animeImg , animeDescription, , animeProducer
 */
router.get("/", async (req, res) => {
    try {
      await knex
        .select()
        .from("anime")
        .then((data) => {
          res.send(data);
        });
    } catch (error) {
      res.status(500).send({
        error: "something went wrong",
        value: error.stack,
      });
    }
  });

  /**
 * template returnObject:
 *  userId:  Int - ID of the user
 *  animeName: String - Name of the anime
 *  animeImg: String - Cover of the anime
 *  animeDescription : String - Description of the anime
 *  animeProducer : String - Producer of the anime
 *
 * @api {post} /anime Add a anime to the database
 * @param {Int} userId ID of the user
 * @param {String} animeName Name of the anime
 * @param {String} animeImg Cover of the anime
 * @param {String} animeDescription Description of the anime
 * @param {String} animeProducer Producer of the anime
 * @returns return object - The anime that was added
 */
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.userId ||
      !req.body.animeName ||
      !req.body.animeImg ||
      !req.body.animeDescription ||
      !req.body.animeProducer
    ) {
      throw new Error("A field was not filled in");
    }
    let anime = new Anime(
      req.body.userId,
      req.body.animeName,
      req.body.animeImg,
      req.body.animeDescription,
      req.body.animeProducer
    );

    await knex("anime").insert(anime);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong",
      value: error.stack,
    });
  }
});

/**
 * Gets all the animes from a user
 * @returns return array - objects that contain : userId , animeName , animeImg , animeDescription, , animeProducer
 */
router.get("/saved/:id", async (req, res) => {
  try {
    await knex
      .select()
      .from("anime")
      .where({ userId: req.params.id })
      .then((data) => {
        res.send(data);
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });

  }
});

/**

 * @api {delete} /user/:id Delete a saved animes
 * @param {Class} _id Id of the object
 *
 * @returns return object - The anime that was deleted
 */
app.delete("/:id", async (req, res) => {
  try {
    const ID = parseInt(req.params.id);

    if (isNaN(ID)) throw new Error("ID is not valid");

    const query = await knex("animes").where({ id: ID });
    const findAnime = query[0];

    if (!findAnime) throw new Error("Movie does not exist");

    await knex("animes")
      .where({ id: ID })
      .del()
      .then(() => {
        res.sendStatus(200);
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });

  }
});


  module.exports = router;

