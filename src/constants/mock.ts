export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    producer: "o-potager",
    location: "Toulouse",
    desc: "Carottes",
    quantity: 1,
    price: 390,
    unit: "kg",
    image: "/photos/carotte.jpg",
  },
  {
    id: 2,
    producer: "gallines",
    location: "Toulouse",
    desc: "Tomates",
    quantity: 1,
    price: 550,
    unit: "kg",
    image: "/photos/tomates.jpg",
  },
  {
    id: 3,
    producer: "maraicher-du-midi",
    location: "Toulouse",
    desc: "Pommes",
    quantity: 1,
    price: 450,
    unit: "kg",
    image: "/photos/pommes.jpg",
  },
  {
    id: 4,
    producer: "fourche",
    location: "Toulouse",
    desc: "Patates",
    quantity: 1,
    price: 280,
    unit: "kg",
    image: "/photos/patates.jpg",
  },
  {
    id: 5,
    producer: "cathy",
    location: "Toulouse",
    desc: "Carottes",
    quantity: 1,
    price: 390,
    unit: "kg",
    image: "/photos/carotte.jpg",
  },
]

const MOCK_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatnim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatnim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex"
const MOCK_PHONE = "01 02 03 04 05"

export const MOCK_PRODUCERS: Record<string, Producer> = {
  "o-potager": {
    name: "Ô Potager",
    description: MOCK_DESCRIPTION,
    email: "contact@opotager.com",
    phone: MOCK_PHONE,
    address: "Chemin des Sables, 31120 Portet-sur-Garonne",
  },
  gallines: {
    name: "Le Jardin des Gallines",
    description: MOCK_DESCRIPTION,
    email: "contact@gallines.com",
    phone: MOCK_PHONE,
    address: "Carpette, 31700 Mondonville",
  },
  "maraicher-du-midi": {
    name: "Maraîcher du Midi",
    description: MOCK_DESCRIPTION,
    email: "contact@maraicherdumidi.com",
    phone: MOCK_PHONE,
    address: "83 Chemin de Ribaute, 31400 Toulouse",
  },
  fourche: {
    name: "La fourche de Jean-Louis",
    description: MOCK_DESCRIPTION,
    email: "contact@lafourche.com",
    phone: MOCK_PHONE,
    address: "Chemin de Carbounel, 31840 Aussonne",
  },
  cathy: {
    name: "Le Jardin de Cathy",
    description: MOCK_DESCRIPTION,
    email: "contact@cathy.com",
    phone: MOCK_PHONE,
    address: "24 Prom. de l'Esplanade, 31180 Lapeyrouse-Fossat",
  },
}
