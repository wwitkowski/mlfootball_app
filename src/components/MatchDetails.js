import _ from "lodash"
import { Col, Row } from "react-bootstrap"
import { Card } from 'react-bootstrap';
import SimilarMatchResults from "./SimilarMatchResults"


const MatchDetails = ( {home_team_data, away_team_data} ) => {

    return <Row>
        <h1>{home_team_data["home"]["team"]}</h1>
        <h1>v</h1>
        <h1>{away_team_data["away"]["team"]}</h1>
        <Row>
            <p>Rating</p>
            <Col>
                <Card>
                    <p>{home_team_data["home"]["rating"]}</p>
                </Card>
            </Col>
            <Col>
                <Card>
                    <p>{away_team_data["away"]["rating"]}</p>
                </Card>
            </Col>
        </Row>
        <Row>
            <p>Importance</p>
            <Col>
                <Card>
                    <p>{home_team_data["home"]["importance"]}</p>
                </Card>
            </Col>
            <Col>
                <Card>
                    <p>{away_team_data["away"]["importance"]}</p>
                </Card>
            </Col>
        </Row>
        <Row>
            <p>Match rating</p>
            <Card>
                <p>### match rating ###</p>
            </Card>
        </Row>
        <Row>
            <Col>
                <p>Similar rated match resutts</p>
                <SimilarMatchResults 
                    spi1={home_team_data["home"]["rating"]}
                    spi2={away_team_data["away"]["rating"]}
                    team1={home_team_data["home"]["team"]}
                    team2={away_team_data["away"]["team"]}
                />
            </Col>
            <Col>
                <p>Prediction</p>
            </Col>
        </Row>
    </Row>
    }


export default MatchDetails