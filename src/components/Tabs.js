import React, { useState } from "react";
import { Col, Row } from "react-bootstrap"
import CurrentSeasonTab from "./CurrentSeasonTab"
import TimeWeightedTab from "./TimeWeightedTab"
import LeagueComparison from "./LeagueComparison";

const Tabs = ( {season, league, home_team_data, away_team_data} ) => {

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
    };

    const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab2");
    };

    return (
        <div className="Tabs">
                <ul className="nav">
                    <li 
                        className={activeTab === "tab1" ? "active" : ""}
                        onClick={handleTab1}
                    >
                        Current Season
                    </li>
                    <li 
                        className={activeTab === "tab2" ? "active" : ""}
                        onClick={handleTab2}
                    >
                        Time Weighted
                    </li>
                </ul>
                <Row>
                    {activeTab === "tab1" ?
                        <CurrentSeasonTab
                            season={season}
                            league={league}  
                            home_team_data={home_team_data}  
                            away_team_data={away_team_data}
                        /> :
                        <TimeWeightedTab
                            league={league}
                            home_team_data={home_team_data}  
                            away_team_data={away_team_data}
                        />
                    }
                    <Col>
                        <LeagueComparison
                            season={season}
                            league={league}  
                            home_team_data={home_team_data}  
                            away_team_data={away_team_data}  
                        />
                    </Col>
                </Row>
        </div>
    )
}

export default Tabs