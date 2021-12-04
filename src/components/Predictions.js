import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useEffect } from "react"
import { GetStandings } from "../api/GetStandings"
import { Col, Row } from "react-bootstrap"
import ScatterXGChart from "../charts/ScatterXGChart"
import { GetWeightedTeamsStats } from "../api/GetWeightedTeamsStats"
import { GetMatchDetails } from "../api/GetMatchDetails"


const Predictions = ( {id, league, team1, team2} ) => {
    const count = 40

    const dispatch = useDispatch()
    const weightedStats = useSelector(state => state.TeamStatsWeighted)
    const predictions = useSelector(state => state.Predictions)

    useEffect(() => {
        FetchWeightedStats(
            league,
            team1,
            team2,
            count
        )
        
      }, [])
    const FetchWeightedStats = (league, team1, team2, count) => {
        dispatch(GetWeightedTeamsStats(league, team1, team2, count))
    }

    useEffect(() => {
        FetchPredictions()
      }, [])
    const FetchPredictions = () => {
        dispatch(GetMatchDetails())

    }

    if (weightedStats.loading) {
        return <p>Loading...</p>
    }
    if (!_.isEmpty(weightedStats.data)) {
        console.log('weighted stats', weightedStats.data)

        
        
        //// TODO: create predictions api function and reducer
        
        if (predictions.loading) {
            return <p>Loading...</p>
        }
        if (!_.isEmpty(predictions.data)) {    
            return <Row>
                <p>loaded predictions and weighted stats</p>
            </Row>
        }
        if (predictions.errorMsg !== "") {
            return <p>{predictions.errorMsg}</p>
        }
    

        return <Row>
            <p>loaded weighted stats</p>
        </Row>


    }
    if (weightedStats.errorMsg !== "") {
        return <p>{weightedStats.errorMsg}</p>
    }

    return <p>Unable to return weighted stats.</p>

}

export default Predictions