import type { FollowedProducer } from "src/types/model"

import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, IconButton } from "@mui/material"
import styled from "@emotion/styled"

import Layout from "src/layout"
import { COLORS } from "src/constants"
import { useUser } from "src/helpers/auth"
import CustomSwitch from "src/components/CustomSwitch"
import Link from "src/components/Link"
import { getMapsLink } from "src/helpers/text"

import DeleteIcon from "src/assets/delete.svg"

const Container = styled.div`
  padding: 4rem 5rem;
  @media (max-width: 900px) {
    padding: 30px 10px;
  }
`
const Card = styled.div`
  background-color: white;
  box-shadow: 5px 5px 20px #00000029;
  padding: 30px;
  margin-top: 20px;
`
const CardTitle = styled.h2`
  font-weight: bold;
  font-size: 20px;
`
const Content = styled.div`
  padding: 20px 0px 20px 20px;
  @media (max-width: 900px) {
    padding: 0;
  }
`
const Subtitle = styled.h3`
  color: ${COLORS.dark};
  opacity: 0.7;
  font-size: 18px;
  font-weight: normal;
`
const TableWrapper = styled(TableContainer)`
  margin-top: 50px;
  color: ${COLORS.lightDark};
`
const DeleteButton = styled(IconButton)`
  width: 32px;
  margin-left: 30px;
`
const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: -20px;
  right: 0px;
  width: 300px;
  padding: 5px 10px;
  background-color: #101010;
  color: white;
  font-size: 10px;
`

// TODO: use standard tooltip
// const useStyles = makeStyles(() => ({
//   deleteIcon: {
//     cursor: "pointer",
//     padding: "10px",
//     borderRadius: "50%",
//     width: "40px",
//     display: "flex",
//     justifyContent: "center",
//     "&:hover": {
//       backgroundColor: "#DF3D3D1A",
//     },
//   },
//   activeSwitch: {
//     "&:hover + $ActiveMessage ": {
//       display: "block",
//     },
//   },
// }))

interface TableItem extends FollowedProducer {
  uid: string
}

const sortByName = (left: TableItem, right: TableItem) => {
  if (!left.name) {
    return -2
  }
  if (!right.name) {
    return 2
  }
  return left.name.toLowerCase() > right.name.toLowerCase() ? 1 : -1
}

const AlertsPage = () => {
  const { user, toggleFollow, toggleEmailAlert } = useUser()

  const numFollowedProducers = user?.followedProducers ? Object.keys(user.followedProducers).length : 0

  const items: TableItem[] = user?.followedProducers
    ? Object.keys(user.followedProducers).map((uid) => ({
        uid,
        ...user.followedProducers[uid],
      }))
    : []

  items.sort(sortByName)

  return (
    <Layout title="Mes alertes" noindex fullWidth>
      <Container>
        <h1>Mes alertes</h1>
        <Card>
          <CardTitle>Liste des producteurs favoris</CardTitle>
          <Content>
            <Subtitle>Vous avez {numFollowedProducers} producteur(s) artisan(s) en favoris</Subtitle>
            {numFollowedProducers > 0 && (
              <TableWrapper>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Producteur</TableCell>
                      <TableCell>Adresse</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.uid}>
                        <TableCell>
                          <Link href={`/producteur/${item.uid}`}>{item.name}</Link>
                        </TableCell>
                        <TableCell>
                          <a href={getMapsLink(item)} target="_blank" rel="noopener">
                            {item.address}
                          </a>
                        </TableCell>
                        <TableCell align="right">
                          <CustomSwitch
                            defaultChecked={item.emailAlert}
                            onChange={() => toggleEmailAlert(item.uid, !item.emailAlert)}
                          />
                          <Tooltip>
                            {item.emailAlert
                              ? "Ne plus recevoir d'email lors des annonces de ce producteur"
                              : "Recevoir un email des annonces de ce producteur"}
                          </Tooltip>
                          <DeleteButton onClick={() => toggleFollow(item.uid, false)}>
                            <DeleteIcon />
                          </DeleteButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrapper>
            )}
          </Content>
        </Card>
      </Container>
    </Layout>
  )
}

export default AlertsPage
