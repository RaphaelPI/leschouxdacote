import type { FollowedProducer } from "src/types/model"

import {
  makeStyles,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  FormControlLabel,
} from "@material-ui/core"

import Layout from "src/layout"
import { COLORS } from "src/constants"
import { useUser } from "src/helpers/auth"
import CustomSwitch from "src/components/CustomSwitch"
import Link from "src/components/Link"
import { getMapsLink } from "src/helpers/text"

import DeleteIcon from "src/assets/delete.svg"

// TODO: use styled components
// TODO: use standard tooltip
const useStyles = makeStyles(() => ({
  wrapper: {
    padding: "4rem 5rem",
    ["@media (max-width: 900px)"]: {
      padding: "30px 10px",
    },
  },
  card: {
    backgroundColor: "white",
    boxShadow: "5px 5px 20px #00000029",
    padding: "30px",
    marginTop: "20px",
  },
  cardTitle: {
    fontweight: "bold",
    fontSize: "20px",
  },
  padding: {
    padding: "20px 0px 20px 20px",
    ["@media (max-width: 900px)"]: {
      padding: "0px",
    },
  },
  subtitle: {
    color: COLORS.dark,
    opacity: "0.7",
    fontSize: "18px",
    fontWeight: "normal",
  },
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
  deleteAllBtn: {
    textTransform: "none",
    backgroundColor: COLORS.red,
    fontSize: "14px",
    padding: "5px 30px",
    "&:hover": {
      backgroundColor: COLORS.red,
    },
  },
  ActiveMessage: {
    display: "none",
    position: "absolute",
    top: "-20px",
    right: "0px",
    width: "300px",
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
  const classes = useStyles()

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
      <div className={classes.wrapper}>
        <h1>Mes alertes</h1>
        <div className={classes.card}>
          <h2 className={classes.cardTitle}>Liste des producteurs favoris</h2>
          <div className={classes.padding}>
            <h3 className={classes.subtitle}>Vous avez {numFollowedProducers} producteur(s) artisan(s) en favoris</h3>
            {numFollowedProducers > 0 && (
              <>
                <TableContainer className={classes.table}>
                  <Table style={{ width: "100%" }} aria-label="simple table" size="small">
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
                            <div className={classes.actions}>
                              <FormControlLabel
                                className={classes.activeSwitch}
                                control={
                                  <CustomSwitch
                                    defaultChecked={item.emailAlert}
                                    onChange={() => toggleEmailAlert(item.uid, !item.emailAlert)}
                                    name={`receive-email-${item.uid}`}
                                  />
                                }
                                label=""
                                labelPlacement="start"
                              />
                              <span className={classes.ActiveMessage}>
                                {item.emailAlert
                                  ? "Ne plus recevoir d'email lors des annonces de ce producteur"
                                  : "Recevoir un email des annonces de ce producteur"}
                              </span>
                              <div className={classes.deleteIcon} onClick={() => toggleFollow(item.uid, false)}>
                                <DeleteIcon />
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AlertsPage
