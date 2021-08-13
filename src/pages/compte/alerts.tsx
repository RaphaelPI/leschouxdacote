import { useState, useMemo, useEffect, useCallback } from "react"
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
  Button,
} from "@material-ui/core"

import Layout from "src/layout"
import { COLORS } from "src/constants"
import { useUser } from "src/helpers/auth"
import CustomSwitch from "src/components/CustomSwitch"
import DeleteIcon from "src/assets/delete.svg"
import api from "src/helpers/api"

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
  const { user, authUser, toggleUserFollow, toggleActiveFollow, deleteManyFollows } = useUser()
  const classes = useStyles()
  const hasFollows = user && user.follows && user.follows.length > 0
  const [selectAll, setSelectAll] = useState(false)
  const [optionsSelected, setOptionsSelected] = useState([] as number[])

  const hasOptionSelected = useMemo(() => {
    return optionsSelected.length > 0
  }, [optionsSelected])

  const isOptionSelected = useCallback(
    (index: number) => {
      return optionsSelected.some((option) => option === index)
    },
    [optionsSelected]
  )

  useEffect(() => {
    if (!user || !user.follows) {
      return
    }
    if (selectAll) {
      setOptionsSelected(user.follows.map((follow, index) => index))
    } else {
      setOptionsSelected([])
    }
  }, [selectAll, user])

  const handleSelectOption = (index: number) => {
    const exist = optionsSelected.some((option) => option === index)
    setOptionsSelected((prevState) => (exist ? prevState.filter((option) => option !== index) : [...prevState, index]))
  }

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

  const handleDeleteMany = async () => {
    if (optionsSelected.length === 0) return
    if (!user || !user.follows || !authUser) return
    const followsToDelete = []
    for (const option of optionsSelected) {
      const follow = user.follows.find((f, index) => index === option)
      if (follow) {
        followsToDelete.push(follow)
      }
    }
    await deleteManyFollows(followsToDelete)
  }

  return (
    <Layout title="Mes alertes" noindex fullWidth>
      <div className={classes.wrapper}>
        <h1>Mes alertes</h1>
        <div className={classes.card}>
          <h2 className={classes.cardTitle}>Liste des producteurs favoris</h2>
          <div className={classes.padding}>
            <h3 className={classes.subtitle}>
              Vous avez {user?.follows?.length ?? 0} producteur(s) artisan(s) en favoris
            </h3>
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
                        <Checkbox checked={selectAll} onChange={() => setSelectAll((prevState) => !prevState)} />
                      </TableCell>
                      <TableCell>Producteur</TableCell>
                      <TableCell>Ville</TableCell>
                      <TableCell align="right">
                        {hasOptionSelected && (
                          <Button
                            size="small"
                            variant="contained"
                            className={classes.deleteAllBtn}
                            onClick={handleDeleteMany}
                          >
                            Supprimer tous
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user?.follows.map((follow, index) => (
                      <TableRow key={follow.producerUID}>
                        <TableCell align="left">
                          <Checkbox checked={isOptionSelected(index)} onChange={() => handleSelectOption(index)} />
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
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AlertsPage
