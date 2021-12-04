import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useEffect } from "react"
import { GetStandings } from "../api/GetStandings"
import { Col, Row } from "react-bootstrap"
import ScatterXGChart from "../charts/ScatterXGChart"


const LeagueComparison = ( {season, league, home_team_data, away_team_data} ) => {

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

        let scatterStats = []
        Object.values(standings.data).map((team) => {
            let obj = {
                team: team.team["name"],
                xgscored: (team.total["xgscored"] / team.total["played"]),
                xgconceded: (team.total["xgconceded"] / team.total["played"]),
                shots_scored: (team.total["shots_scored"] / team.total["played"]),
                xgshot_scored: (team.total["xgscored"] / team.total["shots_scored"]),
                shots_conceded: (team.total["shots_conceded"] / team.total["played"]),
                xgshot_conceded: (team.total["xgconceded"] / team.total["shots_conceded"]),
                xpoints: team.total["xpoints"]
            }
            scatterStats.push(obj)
        })


        return <Row>
           <ScatterXGChart 
                data={scatterStats} 
                team1={team1} 
                team2={team2} 
                xAxisKey="xgconceded" 
                yAxisKey="xgscored" 
                xAxisReversed={true}
                xAxisDomain={['dataMin-0.15', 'dataMax+0.15']}
                yAxisDomain={['dataMin-0.15', 'dataMax+0.15']}
            />
           <ScatterXGChart 
                data={scatterStats} 
                team1={team1} 
                team2={team2} 
                xAxisKey="shots_scored" 
                yAxisKey="xgshot_scored"
                xAxisDomain={['dataMin-1.5', 'dataMax+1.5']}
                yAxisDomain={['dataMin-0.015', 'dataMax+0.015']}
            />
            <ScatterXGChart 
                data={scatterStats} 
                team1={team1} 
                team2={team2} 
                xAxisKey="shots_conceded" 
                yAxisKey="xgshot_conceded"
                //xAxisReversed={true}
                //yAxisReversed={true}
                xAxisDomain={['dataMin-1.5', 'dataMax+1.5']}
                yAxisDomain={['dataMin-0.015', 'dataMax+0.015']}
            />
        </Row>
    }
    if (standings.errorMsg !== "") {
        return <p>{standings.errorMsg}</p>
    }

    return <p>Unable to return league stats.</p>

}

export default LeagueComparison