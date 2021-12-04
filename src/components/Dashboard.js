import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { Container, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useEffect } from "react"
import { GetMatchDetails } from "../api/GetMatchDetails"
import TeamStatsComparison from "./TeamStatsComparison"
import LeagueComparison from "./LeagueComparison"
import MatchDetails from "./MatchDetails"

const Dashboard = (props) => {
    const location = useLocation()
    const id = props.match.params["match"]

    const dispatch = useDispatch()
    const matchDetails = useSelector(state => state.MatchDetails)

    useEffect(() => {
        FetchStandings(id)
      }, [])

    const FetchStandings = (id) => {
        dispatch(GetMatchDetails(id))

    }

    if (matchDetails.loading) {
        return <p>Loading...</p>
    }
    if (!_.isEmpty(matchDetails.data)) {
        const season = matchDetails.data["match"]["season"]
        const league = matchDetails.data["match"]["league_id"]
        const home_team_data = _.pick(matchDetails.data, ['home'])
        const away_team_data = _.pick(matchDetails.data, ['away'])

        return (
            <Container fluid>
                <Row>
                    <Col xs={4}>
                        {<MatchDetails
                            home_team_data={home_team_data}
                            away_team_data={away_team_data}
                        /> }
                        {/* <Predictions
                            id={id}
                            league={location.state.league}  
                            team1={location.state.team1}  
                            team2={location.state.team2}
                        /> */}
                    </Col>
                    <Col xs={8}>
                        <Row>
                            <p>This season / weighted</p>
                        </Row>
                        <Row>
                        <Col>
                            <TeamStatsComparison 
                                season={season}
                                league={league}  
                                home_team_data={home_team_data}  
                                away_team_data={away_team_data}  
                            />
                        </Col>
                        <Col>
                            <LeagueComparison
                                season={season}
                                league={league}  
                                home_team_data={home_team_data}  
                                away_team_data={away_team_data}  
                            />
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
    if (matchDetails.errorMsg !== "") {
        return <p>{matchDetails.errorMsg}</p>
    }

    return <p>Unable to return league stats.</p>
    }

export default Dashboard
