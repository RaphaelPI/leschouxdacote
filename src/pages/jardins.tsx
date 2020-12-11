import MainLayout from "src/layouts/MainLayout"
import Products from "src/components/Products"
import ProductCard from "src/cards/ProductCard"
import { MOCK_DATA } from "src/constants/mock"

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
      <Products $col={3}>
        {MOCK_DATA.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Products>
    </MainLayout>
  )
}

export default ProducerPage
