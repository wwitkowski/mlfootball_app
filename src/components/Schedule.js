import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useState, useEffect, useCallback } from "react"
import { GetSchedule } from "../api/GetSchedule"
import Fixture from "./Fixture"
import DateBar from "./DateBar"
import { Link } from "react-router-dom"

const Schedule = () => {
    const dispatch = useDispatch()
    const schedule = useSelector(state => state.Schedule)
    const [date, updateDate] = useState(new Date());
    const [days, setDays] = useState(0);

    const incrementDate = useCallback(() => {
        setDays(prevState => prevState + 1)
    }, []);      
    const decrementDate = useCallback(() => {
       setDays(prevState => prevState - 1)
    }, []);  
    useEffect(() => {
        updateDate(prevState => new Date(Date.now() + days * 24 * 60 * 60 * 1000));
    }, [days, updateDate])

    useEffect(() => {
        FetchData(date.toISOString().split('T')[0])
        
      }, [date])

    const FetchData = (date) => {
        dispatch(GetSchedule(date))
    }

    const ShowSchedule = () => {
        if (schedule.loading) {
            return <p>Loading...</p>
        }
        if (!_.isEmpty(schedule.data)) {
            const leagueList = _.groupBy(schedule.data, 'league')
            return Object.keys(leagueList).map( (league, index) => {
                return <div key={index}>
                    <h4>{league}</h4>
                        {Object.values(leagueList[league]).map((match) => (                              
                            <Link to={{
                                pathname: `/match/${match.id}`,
                                state: {
                                    team1: `${match.team1}`,
                                    team2: `${match.team2}`,
                                    league: `${match.league_id}`,
                                    season: `${match.season}`
                                }
                            }}>
                                <div>
                                    <Fixture key={match.id} match={match}/>
                                </div>
                            </Link>
                    ))}

                </div>
            })
        }
        if (schedule.errorMsg !== "") {
            return <p>{schedule.errorMsg}</p>
        }

        return <p>Unable to return Schedule.</p>

    }
    return (
        <div>
            <DateBar date={date.toISOString().split('T')[0]}/>
            <button onClick={decrementDate}>Decrement</button>
            <button onClick={incrementDate}>Increment</button>
            {ShowSchedule()}
        </div>
    )
}

export default Schedule