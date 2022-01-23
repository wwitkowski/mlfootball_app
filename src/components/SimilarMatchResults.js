import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useEffect } from "react"
import { GetSimilarResults } from "../api/GetSimilarResults"
import { Col, Row } from "react-bootstrap"
import PercentLabeledPieChart from "../charts/PercentLabeledPieChart"


const SimilarMatchResults = ( {spi1, spi2, team1, team2} ) => {
    const dispatch = useDispatch()
    const similar = useSelector(state => state.SimilarMatchResults)

    useEffect(() => {
        Fetch(spi1, spi2)
    }, [])

    const Fetch = (spi1, spi2) => {
        dispatch(GetSimilarResults(spi1, spi2))
    }


    if (similar.loading) {
        return <p>Loading...</p>
    }
    if (!_.isEmpty(similar.data)) {
        const results = [
            { name: 'Home win', team: team1, value: similar.data.response["home_win"], color: '#20e0e3' },
            { name: 'Draw', team: "Draw", value: similar.data.response["draw"], color: '#808080' },
            { name: 'Away win', team: team2, value: similar.data.response["away_win"], color: '#d619e0' },
        ]

        return <Row>
            <PercentLabeledPieChart data={results} />
        </Row>
    }
    if (similar.errorMsg !== "") {
        return <p>{similar.errorMsg}</p>
    }
    return <p>Unable to return similar results.</p>
}

export default SimilarMatchResults