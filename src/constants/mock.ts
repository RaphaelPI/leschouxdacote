export const MOCK_PRODUCTS: Product[] = Array.from(new Array(23)).map((_, index) => ({
  id: index,
  producer: "gallines",
  location: "Toulouse",
  desc: "Carottes",
  quantity: 500,
  price: 390,
  unit: "kg",
  image: "/carotte.png",
}))

export const MOCK_PRODUCERS: Record<string, Producer> = {
  gallines: {
    name: "Les jardins des Gallines",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatnim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatnim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
    email: "prenom.nom@gmail.com",
    phone: "01 02 03 04 05",
    address: "20 rue des Choux, 31520 Ramonville",
  },
}
