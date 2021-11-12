import styled from "@emotion/styled"
import { Button } from "@mui/material"
import IconHeartEmpty from "src/assets/icon-heart-empty.svg"
import IconHeart from "src/assets/icon-heart.svg"
import { useUser } from "src/helpers/auth"
import { isFollowed } from "src/helpers/user"

const Container = styled(Button)`
  margin: 20px auto 10px;
  background-color: white;
  color: #f21414;
  text-transform: none;
  font-weight: 300;
  &:hover {
    background-color: white;
  }
`

interface Props {
  producer: string
}

const FollowButton = ({ producer }: Props) => {
  const { user, toggleFollow } = useUser()
  const followed = isFollowed(producer, user)

  return (
    <Container
      onClick={() => toggleFollow(producer, !followed)}
      variant="contained"
      startIcon={followed ? <IconHeart /> : <IconHeartEmpty />}
    >
      {followed ? "Ne plus suivre le producteur" : "Suivre le producteur"}
    </Container>
  )
}

export default FollowButton
