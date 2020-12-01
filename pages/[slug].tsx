import styled from "styled-components"
import { useRouter } from "next/router"

const Container = styled.div``
const Test = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <Container>
      <h1>{slug}</h1>
    </Container>
  )
}

export default Test
