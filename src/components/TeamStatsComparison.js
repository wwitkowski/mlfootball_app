import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useEffect } from "react"
import { GetTeamsStats } from "../api/GetTeamsStats"
import { Col, Row } from "react-bootstrap"
import RadarComparisonChart from "../charts/RadarComparisonChart";
import StackedBarComparisonChart from "../charts/StackedBarComparisonChart";


const TeamStatsComparison = ( {season, league, home_team_data, away_team_data} ) => {

    const team1 = home_team_data["home"]["team"]
    const team2 = away_team_data["away"]["team"]
    const dispatch = useDispatch()
    const stats = useSelector(state => state.TeamStatsComparison)

    useEffect(() => {
        FetchData(
            season,
            league,
            team1,
            team2
        )
        
      }, [season, league, team1, team2])

    const FetchData = (season, league, team1, team2) => {
        dispatch(GetTeamsStats(season, league, team1, team2))
    }


    if (stats.loading) {
        return <p>Loading...</p>
    }
    if (!_.isEmpty(stats.data)) {
        const allowedAttStats = [
            'scored',
            'xgscored',
            'nsxgscored',
            'shots_scored',
            'shotsot_scored',
        ]
        const allowedDefStats = [
            'conceded',
            'xgconceded',
            'nsxgconceded',
            'shots_conceded',
            'shotsot_conceded',
        ]

        let attStats = []
        Object.keys(stats.data.team1.total).filter(key => allowedAttStats.includes(key)).map((stat) => {
            let obj = {
                stat: stat,
                team1: (stats.data.team1.total[stat] / stats.data.team1.total["played"]) / ((stats.data.team1.total[stat] / stats.data.team1.total["played"]) + stats.data.team2.total[stat] / stats.data.team2.total["played"]),
                team2: (stats.data.team2.total[stat] / stats.data.team2.total["played"])/ ((stats.data.team1.total[stat] / stats.data.team1.total["played"]) + stats.data.team2.total[stat] / stats.data.team2.total["played"]),
            }
            attStats.push(obj)
        })

        let defStats = []
        Object.keys(stats.data.team1.total).filter(key => allowedDefStats.includes(key)).map((stat) => {
            let obj = {
                stat: stat,
                team1: (stats.data.team1.total[stat] / stats.data.team1.total["played"]) / ((stats.data.team1.total[stat] / stats.data.team1.total["played"]) + stats.data.team2.total[stat] / stats.data.team2.total["played"]),
                team2: (stats.data.team2.total[stat] / stats.data.team2.total["played"])/ ((stats.data.team1.total[stat] / stats.data.team1.total["played"]) + stats.data.team2.total[stat] / stats.data.team2.total["played"]),
            }
            defStats.push(obj)
        })

        let barStats = []
        Object.keys(stats.data.team1.total).filter(key => !["played"].includes(key)).map((stat) => {
            let obj = {}
            obj["stat"] = stat
            obj[team1] = Number(stats.data.team1.total[stat] / stats.data.team1.total["played"]).toFixed(2)
            obj[team2] = Number(stats.data.team2.total[stat] / stats.data.team2.total["played"]).toFixed(2)
            barStats.push(obj)
        })


        return <Row>
                <Col>
                    <RadarComparisonChart data={attStats} team1Name={team1} team2Name={team2} />
                </Col>
                <Col>
                    <RadarComparisonChart data={defStats} team1Name={team1} team2Name={team2} />    
                </Col>
                <StackedBarComparisonChart data={barStats} team1Name={team1} team2Name={team2} />
        </Row>
    }
    if (stats.errorMsg !== "") {
        return <p>{stats.errorMsg}</p>
    }

    return <p>Unable to return match stats.</p>
}


export default TeamStatsComparison