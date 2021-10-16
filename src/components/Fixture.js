import { Link } from "react-router-dom"

const Fixture = ({match}) => {

    return (
        <div>
            <Link to={{
                pathname: `/match/${match.id}`,
                state: {
                    team1: `${match.team1}`,
                    team2: `${match.team2}`,
                }
            }}>
                {match.team1} - {match.team2}
            </Link>

        </div>
    )
}

export default Fixture