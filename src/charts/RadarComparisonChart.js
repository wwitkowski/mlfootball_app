import {
    Radar, 
    RadarChart,
    PolarGrid, 
    PolarAngleAxis, 
    PolarRadiusAxis, 
    Legend, 
    ResponsiveContainer,
} from "recharts";


const RadarComparisonChart = ( {data, team1Name, team2Name} ) => {

    return (
        <ResponsiveContainer width={260} height={280}>    
            <RadarChart cx="50%" cy="60%" outerRadius={"70%"}  data={data}>
                <Legend verticalAlign="top" align='center'/>
                <PolarGrid />
                <PolarAngleAxis dataKey="stat" />
                <PolarRadiusAxis angle={90} domain={[0, 1]} />
                <Radar name={team1Name} dataKey="team1" stroke="#20e0e3" fill="#20e0e3" fillOpacity={0.6} />
                <Radar name={team2Name} dataKey="team2" stroke="#d619e0" fill="#d619e0" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    )
}

export default RadarComparisonChart
                    