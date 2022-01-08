import TeamStatsComparison from "./TeamStatsComparison"
import LeagueComparison from "./LeagueComparison"
import { Col, Row } from "react-bootstrap"


const CurrentSeasonTab = ( {season, league, home_team_data, away_team_data} ) => {

    return (
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
    )
}

export default CurrentSeasonTab