export const MOCK_PRODUCTS: Product[] = [
  {
    id: "ca1",
    name: "Carottes",
    producer: "o-potager",
    location: "Toulouse",
    quantity: 1,
    price: 390,
    unit: "kg",
    image: "/photos/carottes-fanes.jpg",
  },
  {
    id: "chv",
    name: "Chou vert",
    producer: "o-potager",
    location: "Toulouse",
    quantity: 1,
    price: 250,
    unit: "unité",
    image: "/photos/chou-vert.jpg",
  },
  {
    id: "to1",
    name: "Tomates",
    producer: "gallines",
    location: "Toulouse",
    quantity: 1,
    price: 550,
    unit: "kg",
    image: "/photos/tomates.jpg",
  },
  {
    id: "ch1",
    name: "Chou",
    producer: "gallines",
    location: "Toulouse",
    quantity: 1,
    price: 240,
    unit: "unité",
    image: "/photos/chou.jpg",
  },
  {
    id: "po1",
    name: "Pommes",
    producer: "maraicher-du-midi",
    location: "Toulouse",
    quantity: 1,
    price: 450,
    unit: "kg",
    image: "/photos/pommes.jpg",
  },
  {
    id: "chc",
    name: "Chou chinois",
    producer: "maraicher-du-midi",
    location: "Toulouse",
    quantity: 1,
    price: 260,
    unit: "unité",
    image: "/photos/chou-chinois.jpg",
  },
  {
    id: "pa1",
    name: "Patates",
    producer: "fourche",
    location: "Toulouse",
    quantity: 1,
    price: 280,
    unit: "kg",
    image: "/photos/patates.jpg",
  },
  {
    id: "chb",
    name: "Choux de Bruxelles",
    producer: "fourche",
    location: "Toulouse",
    quantity: 1,
    price: 200,
    unit: "kg",
    image: "/photos/choux-bruxelles.jpg",
  },
  {
    id: "ca2",
    name: "Carottes",
    producer: "cathy",
    location: "Toulouse",
    quantity: 1,
    price: 390,
    unit: "kg",
    image: "/photos/carottes-petites.jpg",
  },
  {
    id: "ca2",
    name: "Chou frisé",
    producer: "cathy",
    location: "Toulouse",
    quantity: 1,
    price: 260,
    unit: "unité",
    image: "/photos/chou-kale.jpg",
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
    position: [43.539, 1.424],
  },
  gallines: {
    name: "Le Jardin des Gallines",
    description: MOCK_DESCRIPTION,
    email: "contact@gallines.com",
    phone: MOCK_PHONE,
    address: "Carpette, 31700 Mondonville",
    position: [43.674, 1.305],
  },
  "maraicher-du-midi": {
    name: "Maraîcher du Midi",
    description: MOCK_DESCRIPTION,
    email: "contact@maraicherdumidi.com",
    phone: MOCK_PHONE,
    address: "83 Chemin de Ribaute, 31400 Toulouse",
    position: [43.577, 1.508],
  },
  fourche: {
    name: "La fourche de Jean-Louis",
    description: MOCK_DESCRIPTION,
    email: "contact@lafourche.com",
    phone: MOCK_PHONE,
    address: "Chemin de Carbounel, 31840 Aussonne",
    position: [43.697, 1.34],
  },
  cathy: {
    name: "Le Jardin de Cathy",
    description: MOCK_DESCRIPTION,
    email: "contact@cathy.com",
    phone: MOCK_PHONE,
    address: "24 Prom. de l'Esplanade, 31180 Lapeyrouse-Fossat",
    position: [43.693, 1.517],
  },
}
