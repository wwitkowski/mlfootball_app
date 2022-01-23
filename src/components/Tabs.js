import { useState } from "react";
import { Col } from "react-bootstrap"




const Tabs = (props) => {

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
                <Col>
                    <ul className="nav">
                        <li 
                            className={activeTab === "tab1" ? "active" : ""}
                            onClick={handleTab1}
                        >
                            {props.tab1Name}
                        </li>
                        <li 
                            className={activeTab === "tab2" ? "active" : ""}
                            onClick={handleTab2}
                        >
                            {props.tab2Name}
                        </li>
                    </ul>
                        {activeTab === "tab1" ? props.children[0] : props.children[1] }
                </Col>
    )
}

export default Tabs