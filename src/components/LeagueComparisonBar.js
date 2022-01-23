import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useEffect } from "react"
import { GetStandings } from "../api/GetStandings"
import { Row } from "react-bootstrap"
import HorizontalBarChart from "../charts/HorizontalBarChart"


const LeagueComparisonBar = ( {season, league, home_team_data, away_team_data} ) => {

    const team1 = home_team_data["home"]["team"]
    const team2 = away_team_data["away"]["team"]
    const dispatch = useDispatch()
    const standings = useSelector(state => state.LeagueComparison)

    useEffect(() => {
        FetchStandings(
            season,
            league,
        )
        
      }, [])

    const FetchStandings = (season, league) => {
        dispatch(GetStandings(season, league))
    }


    if (standings.loading) {
        return <p>Loading...</p>
    }
    if (!_.isEmpty(standings.data)) {

        let barStats = []
        Object.values(standings.data).map((team) => {
            let obj = {
                team: team.team["name"],
                xgscored: Number(team.total["xgscored"]).toFixed(2),
                xgconceded: Number(team.total["xgconceded"]).toFixed(2),
                shots_scored: Number(team.total["shots_scored"]).toFixed(2),
                xgshot_scored: Number(team.total["xgscored"]).toFixed(2),
                shots_conceded: Number(team.total["shots_conceded"]).toFixed(2),
                xgshot_conceded: Number(team.total["xgconceded"]).toFixed(2),
                xpoints: Number(team.total["xpoints"]).toFixed(2)
            }
            barStats.push(obj)
        })


        return <Row>
           <HorizontalBarChart 
                data={barStats} 
                dataKey='xpoints'
                team1={team1} 
                team2={team2} 
            />
        </Row>
    }
    if (standings.errorMsg !== "") {
        return <p>{standings.errorMsg}</p>
    }

    return <p>Unable to return league stats.</p>

}

export default LeagueComparisonBar