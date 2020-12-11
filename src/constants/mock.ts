export const MOCK_DATA = Array.from(new Array(23).keys()).map((index) => ({
  id: index,
  producer: "Les jardins des Gallines",
  location: "Toulouse",
  desc: "Carottes",
  quantity: 500,
  price: 390,
  unit: "kg",
  image: "/carotte.png",
}))
