import TeamStatsComparison from "./TeamStatsComparison"
import { Col } from "react-bootstrap"


const CurrentSeasonStats = ( {season, league, home_team_data, away_team_data} ) => {

    return (
        <Col>
            <TeamStatsComparison 
                season={season}
                league={league}  
                home_team_data={home_team_data}  
                away_team_data={away_team_data}  
            />
        </Col>
    )
}

export default CurrentSeasonStats