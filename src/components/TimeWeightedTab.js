import { Col, Row } from "react-bootstrap"
import TeamStatsWeightedComparison from "./TeamStatsWeightedComparison"

const TimeWeightedTab = ( {league, home_team_data, away_team_data} ) => {

    return (
        <Col>
            <TeamStatsWeightedComparison 
                league={league}
                home_team_data={home_team_data}  
                away_team_data={away_team_data}  
            />
        </Col>
    )
}

export default TimeWeightedTab