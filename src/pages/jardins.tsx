import MainLayout from "src/layouts/MainLayout"
import styled from "styled-components"
import ProductCard from "src/cards/ProductCard"

const MOCK_DATA = Array.from(new Array(24).keys()).map((index) => ({
  id: index,
  producer: "Les jardins des Gallines",
  location: "Toulouse",
  desc: "Carottes",
  quantity: 500,
  price: 390,
  unit: "kg",
  image: "/carotte.png",
}))

const Products = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: -16px;
`

const ProducerPage = () => {
  return (
    <MainLayout wide>
      <h1>Les jardins des Gallines</h1>
      <h2>Description</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequatnim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exLorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatnim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
      </p>
      <h2>E-mail</h2>
      <p>
        <a href="mailto:prenom.nom@gmail.com">prenom.nom@gmail.com</a>
      </p>
      <h2>Téléphone</h2>
      <p>
        <a href="tel:+33102030405">01 02 03 04 05</a>
      </p>
      <h2>3 annonces en ligne</h2>
      <Products>
        {MOCK_DATA.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Products>
    </MainLayout>
  )
}

export default ProducerPage
