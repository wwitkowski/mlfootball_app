import React, { useState } from "react";
import { Col, Row } from "react-bootstrap"
import CurrentSeasonTab from "./CurrentSeasonTab"
import TimeWeightedTab from "./TimeWeightedTab"

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
                <div className='tab_content'>
                    {activeTab === "tab1" ?
                        <CurrentSeasonTab
                            season={season}
                            league={league}  
                            home_team_data={home_team_data}  
                            away_team_data={away_team_data}
                        /> :
                        <TimeWeightedTab
                            season={season}
                            league={league}  
                            home_team_data={home_team_data}  
                            away_team_data={away_team_data}
                        />
                    }
                </div>
        </div>
    )
}

export default Tabs