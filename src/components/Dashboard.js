import { Container, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useEffect } from "react"
import { GetMatchDetails } from "../api/GetMatchDetails"
import LeagueComparisonScatter from "./LeagueComparisonScatter"
import LeagueComparisonBar from "./LeagueComparisonBar"
import MatchDetails from "./MatchDetails"
import CurrentSeasonStats from "./CurrentSeasonStats"
import TimeWeightedStats from "./TimeWeightedStats"
import Tabs from "./Tabs"

const Dashboard = (props) => {
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
                            <Tabs 
                                tab1Name='Current Season'
                                tab2Name='Time Weighted'
                            >
                                <CurrentSeasonStats
                                    season={season}
                                    league={league}  
                                    home_team_data={home_team_data}  
                                    away_team_data={away_team_data}
                                />
                                <TimeWeightedStats
                                    league={league}
                                    home_team_data={home_team_data}  
                                    away_team_data={away_team_data}
                                />
                            </Tabs>
                            <Tabs 
                                tab1Name='Scatter'
                                tab2Name='Bar'
                            >
                                <LeagueComparisonScatter
                                    season={season}
                                    league={league}  
                                    home_team_data={home_team_data}  
                                    away_team_data={away_team_data}
                                />
                                <LeagueComparisonBar
                                   season={season}
                                   league={league}  
                                   home_team_data={home_team_data}  
                                   away_team_data={away_team_data}
                                />
                            </Tabs>
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
