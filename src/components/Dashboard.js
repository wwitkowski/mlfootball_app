import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { Container, Col, Row } from "react-bootstrap"
import MatchStats from "./MatchStats"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const location = useLocation()


    return (
        <Container fluid>
            <Row>
                <Col>
                    <MatchStats 
                        season={location.state.season}
                        league={location.state.league}  
                        team1={location.state.team1}  
                        team2={location.state.team2}  
                    />
                </Col>
                <Col>
                    Column 2
                </Col>
                <Col>
                    Column 3
                </Col>
            </Row>
        </Container>
    )


}

export default Dashboard
