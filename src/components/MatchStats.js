import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useEffect } from "react"
import { GetMatchStats } from "../api/GetMatchStats"
import { RadarChart } from "./RadarChart"
import { BarChart } from "./BarChart"
import { Container, Col, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


const MatchStats = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const matchStats = useSelector(state => state.MatchStats)

    useEffect(() => {
        FetchData(
            location.state.season,
            location.state.league,
            location.state.team1,
            location.state.team2
        )
        
      }, [])

    const FetchData = (season, league, team1, team2) => {
        dispatch(GetMatchStats(season, league, team1, team2))
    }

    const showMatchStats = () => {
        if (matchStats.loading) {
            return <p>Loading...</p>
        }
        if (!_.isEmpty(matchStats.data)) {
            const allowedRadarStats = [
                'scored',
                'xgscored',
                'conceded',
                'xgconceded',
                'nsxgscored',
                'nsxgconceded',
                'xpoints',
                'points'
            ]
            const notAllowedBarChart = ['played']
            const radarChartData = {
                labels: Object.keys(matchStats.data.team1.total).filter(key => allowedRadarStats.includes(key)).map((stat_name) => stat_name),
                datasets: [
                  {
                    label: matchStats.data.team1.team.name,
                    data: Object.keys(matchStats.data.team1.total).filter(
                        key => allowedRadarStats.includes(key)
                    ).map(
                        (stat) => matchStats.data.team1.total[stat] / matchStats.data.team1.total["played"]
                    ),
                    backgroundColor: "rgba(34, 202, 236, .2)",
                    borderColor: "rgba(34, 202, 236, 1)",
                  },
                  {
                    label: matchStats.data.team2.team.name,
                    data: Object.keys(matchStats.data.team2.total).filter(
                        key => allowedRadarStats.includes(key)
                    ).map(
                        (stat) => matchStats.data.team2.total[stat] / matchStats.data.team2.total["played"]
                    ),
                    backgroundColor: "rgba(230, 21, 219, .2)",
                    borderColor: "rgba(230, 21, 219, 1)",
                  }
                ]
            }

            const barChartData = {
                labels: Object.keys(matchStats.data.team1.total).filter(key => !notAllowedBarChart.includes(key)).map((stat_name) => stat_name),
                datasets: [
                  {
                    label: matchStats.data.team1.team.name,
                    data: Object.keys(matchStats.data.team1.total).filter(
                        key => !notAllowedBarChart.includes(key)
                    ).map(
                        (stat) => -1*(matchStats.data.team1.total[stat] / matchStats.data.team1.total["played"])
                    ),
                    backgroundColor: "rgba(34, 202, 236)"
                  },
                  {
                    label: matchStats.data.team2.team.name,
                    data: Object.keys(matchStats.data.team2.total).filter(
                        key => !notAllowedBarChart.includes(key)
                    ).map(
                        (stat) => matchStats.data.team2.total[stat] / matchStats.data.team2.total["played"]
                    ),
                    backgroundColor: "rgba(230, 21, 219)"
                  }
                ]
            }

            return <Row>
                <Col>
                    <RadarChart chartData={radarChartData} />
                </Col>
                <Col>
                    <BarChart chartData={barChartData} />
                </Col>
            </Row>
        }
        if (matchStats.errorMsg !== "") {
            return <p>{matchStats.errorMsg}</p>
        }

        return <p>Unable to return match stats.</p>
    }

    return (
        <div>
            <h2>{location.state.team1} v {location.state.team2}</h2>
            <Container fluid>
                {showMatchStats()}
                <Row>
                    <Col>1 of 2</Col>
                    <Col>2 of 2</Col>
                </Row>
                <Row>
                    Row 1
                </Row>
                <Row>
                    Row 2
                </Row>
            </Container>
        </div>
    )
}

export default MatchStats