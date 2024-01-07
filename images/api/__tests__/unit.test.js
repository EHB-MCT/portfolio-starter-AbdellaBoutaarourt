const Anime = require("../classes/Anime");

describe("Anime Class", () => {
  it("should create a new Anime instance with correct properties", () => {
    const userId = 1;
    const animeName = "Test Anime";
    const animeImg = "test_anime_image.jpg";
    const animeDescription = "This is a test anime";
    const animeProducer = "Test Producer";

    const animeInstance = new Anime(
      userId,
      animeName,
      animeImg,
      animeDescription,
      animeProducer
    );

    expect(animeInstance.userId).toEqual(userId);
    expect(animeInstance.animeName).toEqual(animeName);
    expect(animeInstance.animeImg).toEqual(animeImg);
    expect(animeInstance.animeDescription).toEqual(animeDescription);
    expect(animeInstance.AnimeProducer).toEqual(animeProducer);
  });
});





