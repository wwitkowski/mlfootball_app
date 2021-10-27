import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Label,
    LabelList
  } from "recharts";


const StackedBarComparisonChart = ( {data, team1Name, team2Name} ) => {

    const renderCustomizedLabel = (props) => {
        const { content, ...rest } = props;
      
        return <Label {...rest} fontSize="12" fill="#FFFFFF" fontWeight="Bold" />
    }

    return (
        <ResponsiveContainer width={400} height={600}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{ left: 50, right: 50 }}
                stackOffset="expand"
            >
                <XAxis hide type="number" />
                <YAxis
                    type="category"
                    dataKey="stat"
                    fontSize="12"
                />
                <Tooltip />
                <Bar dataKey={team1Name} fill="#20e0e3" stackId="a">
                    <LabelList
                        dataKey={team1Name}
                        position="center"
                        content={renderCustomizedLabel}
                    />
                </Bar>
                <Bar dataKey={team2Name} fill="#d619e0" stackId="a">
                    <LabelList
                        dataKey={team2Name}
                        position="center"
                        content={renderCustomizedLabel}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )

}

export default StackedBarComparisonChart
