class Anime {
    constructor(
      userId,
      animeName,
      animeImg,
      animeDescription,
      AnimeProducer
    ) {
      this.userId = userId;
      this.animeName = animeName;
      this.animeImg = animeImg;
      this.animeDescription = animeDescription;
      this.AnimeProducer = AnimeProducer;
    }
  }

  module.exports = Anime;