import { Card } from 'react-bootstrap';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Label, Cell } from 'recharts';

const ScatterXGChart = ( {data,
                          team1, 
                          team2, 
                          xAxisKey, 
                          yAxisKey, 
                          xAxisReversed=false, 
                          yAxisReversed=false, 
                          xAxisDomain=[0, 'dataMax'], 
                          yAxisDomain=[0, 'dataMax']
} ) => {

    const renderCustomizedLabel = (props, team1, team2) => {

        if ((props["value"] == team1) || (props["value"] == team2)) {
            const { content, ...rest } = props;
            return <Label {...rest} fontSize="12" fill="#505050" />
        }

        return <Label />

    }
    const formatAxis = (tickItem) => {
        return Number(tickItem.toFixed(2))
      }
    
    const CustomTooltip = ({ active, payload }) => {
        if (active) {
            return (
                <div>
                    <Card>
                        <p>{payload[0].payload["team"]}</p>
                        <p>{payload[1]["name"]}: {Number(payload[1]["value"]).toFixed(2)}</p>
                        <p>{payload[0]["name"]}: {Number(payload[0]["value"]).toFixed(2)}</p>
                    </Card>
                </div>
            )
        }

        return null;
    };

    let colors = []
    data.map((entry, index) => {
        let color = entry["team"] === team1 ? "#20e0e3" : entry["team"] === team2 ? "#d619e0" : "#808080"
        colors.push(color)
    })


    return (
        <ResponsiveContainer width={640} height={300}>
                <ScatterChart

                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                <CartesianGrid />
                <XAxis 
                    type="number" 
                    domain={xAxisDomain} 
                    dataKey={xAxisKey} 
                    reversed={xAxisReversed}
                    tickFormatter={formatAxis}
                />
                <YAxis 
                    type="number" 
                    domain={yAxisDomain} 
                    dataKey={yAxisKey}
                    reversed={yAxisReversed}
                    tickFormatter={formatAxis}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={CustomTooltip}/>
                <Scatter data={data} fill="#808080" >
                    <LabelList 
                        dataKey="team"
                        position="bottom"
                        content={props => renderCustomizedLabel(props, team1, team2)}
                        //valueAccesor={valueAccessor("team")}
                    />
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    )
}

export default ScatterXGChart