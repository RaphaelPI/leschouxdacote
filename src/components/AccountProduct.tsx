import styled from "styled-components"

import { formatAmount, formatQuantity } from "src/helpers/text"

const Container = styled.div`
  margin: 20px 0;
`

interface Props {
  product: Product
}

const AccountProduct = ({ product }: Props) => {
  // TODO
  return (
    <Container>
      {product.title} | {formatAmount(product.price)} | {formatQuantity(product)} | {product.city}
    </Container>
  )
}

export default AccountProduct
