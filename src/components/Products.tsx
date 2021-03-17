import styled from "@emotion/styled"

const Products = styled.section<{ $col: number }>`
  display: flex;
  flex-wrap: wrap;
  margin: -16px;
  > div {
    flex: 0 0 calc(${({ $col }) => 100 / $col}% - 32px);
    margin: 16px;
    @media (max-width: 600px) {
      flex: 1;
      min-width: 250px;
      max-width: 450px;
    }
  }
`
export default Products
