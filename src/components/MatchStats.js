
import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useEffect } from "react"
import { GetMatchStats } from "../api/GetMatchStats"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer } from 'recharts';
import { Col, Row } from "react-bootstrap"


const MatchStats = ( {season, league, team1, team2} ) => {
    
    const dispatch = useDispatch()
    const matchStats = useSelector(state => state.MatchStats)

    useEffect(() => {
        FetchData(
            season,
            league,
            team1,
            team2
        )
        
      }, [])

    const FetchData = (season, league, team1, team2) => {
        dispatch(GetMatchStats(season, league, team1, team2))
    }


    if (matchStats.loading) {
        return <p>Loading...</p>
    }
    if (!_.isEmpty(matchStats.data)) {
        const allowedMainStats = [
            'scored',
            'xgscored',
            'conceded',
            'xgconceded',
            'nsxgscored',
            'nsxgconceded',
            'xpoints',
            'points'
        ]
        const allowedOtherChart = [
            'shots_scored',
            'shotsot_scored',
            'corners_scored',
            'fouls_scored',
            'shots_conceded',
            'shotsot_conceded',
            'corners_conceded',
            'fouls_conceded',
        ]

        let result = []
        Object.keys(matchStats.data.team1.total).filter(key => allowedMainStats.includes(key)).map((stat) => {
            let obj = {
                stat: stat,
                team1: matchStats.data.team1.total[stat] / matchStats.data.team1.total["played"],
                team2: matchStats.data.team2.total[stat] / matchStats.data.team2.total["played"]
            }
            result.push(obj)
        })

        return <Row>
            <Col>
            <ResponsiveContainer width="100%" height={600} minWidth={400}>    
                <RadarChart outerRadius={"70%"}  data={result}>
                    <Legend verticalAlign="top" align='center'/>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="stat" />
                    <PolarRadiusAxis angle={90} domain={[0, 4]} />
                    <Radar name={team1} dataKey="team1" stroke="#20e0e3" fill="#20e0e3" fillOpacity={0.6} />
                    <Radar name={team2} dataKey="team2" stroke="#d619e0" fill="#d619e0" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
            </Col>
        </Row>
    }
    if (matchStats.errorMsg !== "") {
        return <p>{matchStats.errorMsg}</p>
    }

    return <p>Unable to return match stats.</p>
    }


export default MatchStats