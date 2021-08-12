import styled from "@emotion/styled"
import {
  makeStyles,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core"

import Layout from "src/layout"
import { COLORS, LAYOUT } from "src/constants"
import { useUser } from "src/helpers/auth"
import CustomSwitch from "src/components/CustomSwitch"
import DeleteIcon from "src/assets/delete.svg"
import api from "src/helpers/api"

const Wrapper = styled.div`
  padding: 4rem 5rem;

  @media (max-width: ${LAYOUT.mobile}px) {
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

const Padding = styled.div`
  padding: 20px 0px 20px 20px;

  @media (max-width: ${LAYOUT.mobile}px) {
    padding: 0px;
  }
`

const SubTitle = styled.h3`
  color: ${COLORS.dark};
  opacity: 0.7;
  font-size: 18px;
  font-weight: normal;
`

const useStyles = makeStyles(() => ({
  table: {
    marginTop: "50px",
    color: COLORS.lightDark,
  },
  deleteIcon: {
    cursor: "pointer",
    padding: "10px",
    borderRadius: "50%",
    width: "40px",
    display: "flex",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#DF3D3D1A",
    },
  },
  ActiveMessage: {
    display: "none",
    position: "absolute",
    top: "-20px",
    right: "0px",
    padding: "5px 10px",
    backgroundColor: "#101010",
    color: "white",
    fontSize: "10px",
  },
  activeSwitch: {
    "&:hover + $ActiveMessage ": {
      display: "block",
    },
  },
  actions: {
    position: "relative",
    display: "flex",
    gap: "50px",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}))

const AlertsPage = () => {
  const { user, authUser, toggleUserFollow, toggleActiveFollow } = useUser()
  const classes = useStyles()

  const handleReceiveMailChange = async () => {
    if (!user || !authUser) return
    try {
      await api.put("follows", {
        userId: user.objectID,
        authUserId: authUser.uid,
        action: "receiveMail",
      })
    } catch (e) {
      console.error(e)
    }
  }

  const hasFollows = user && user.follows && user.follows.length > 0

  return (
    <Layout title="Mes alertes" noindex fullWidth>
      <Wrapper>
        <h1>Mes alertes</h1>
        <Card>
          <CardTitle>Liste des producteurs favoris</CardTitle>
          <Padding>
            <SubTitle>Vous avez {user?.follows?.length ?? 0} producteur(s) artisan(s) en favoris</SubTitle>
            {hasFollows && (
              <>
                <FormControlLabel
                  control={
                    <CustomSwitch
                      defaultChecked={user?.hasAcceptedFollowsEmail ?? false}
                      onChange={handleReceiveMailChange}
                      name="receive-email"
                    />
                  }
                  label="Recevoir un email des annonces de ces producteurs"
                  labelPlacement="start"
                  style={{ margin: "0px 20px 0px 0px" }}
                />
              </>
            )}
            {hasFollows && (
              <TableContainer className={classes.table}>
                <Table style={{ width: "100%" }} aria-label="simple table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          checked={true}
                          onChange={() => console.log("in")}
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </TableCell>
                      <TableCell>Producteur</TableCell>
                      <TableCell>Ville</TableCell>
                      <TableCell align="right" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user?.follows.map((follow, index) => (
                      <TableRow key={follow.producerUID}>
                        <TableCell align="left">
                          <Checkbox
                            checked={true}
                            onChange={() => console.log("in")}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {follow.producerName}
                        </TableCell>
                        <TableCell> {follow.producerAddress}</TableCell>
                        <TableCell align="right">
                          <div className={classes.actions}>
                            <FormControlLabel
                              className={classes.activeSwitch}
                              control={
                                <CustomSwitch
                                  defaultChecked={follow.isActive}
                                  onChange={() => toggleActiveFollow(follow)}
                                  name={`receive-email-${index}`}
                                />
                              }
                              label=""
                              labelPlacement="start"
                            />
                            <span className={classes.ActiveMessage}>
                              {follow.isActive
                                ? "Ne plus recevoir d'email lors des annonces de ce producteur"
                                : "Recevoir un email des annonces de ce producteur"}
                            </span>
                            <div className={classes.deleteIcon} onClick={() => toggleUserFollow(follow.producerUID)}>
                              <DeleteIcon />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Padding>
        </Card>
      </Wrapper>
    </Layout>
  )
}

export default AlertsPage
