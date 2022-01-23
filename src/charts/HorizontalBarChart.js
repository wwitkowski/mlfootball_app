import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Label,
    LabelList,
    Cell
  } from "recharts";
  import _ from "lodash"


const HorizontalBarChart = ( {data, dataKey, team1, team2} ) => {

    const dataSorted =  _.orderBy(data, dataKey, ['desc'])

    const renderCustomizedLabel = (props) => {
        const { content, ...rest } = props;
      
        return <Label {...rest} fontSize="12" fill="#FFFFFF" fontWeight="Bold" />
    }

    let colors = []
    dataSorted.map((entry, index) => {
        let color = entry["team"] === team1 ? "#20e0e3" : entry["team"] === team2 ? "#d619e0" : "#808080"
        colors.push(color)
    })

    return (
        <ResponsiveContainer width={600} height={960}>
            <BarChart
                layout="vertical"
                data={dataSorted}
                margin={{ top: 100, bottom: 100 }}
            >
                <XAxis hide type="number" />
                <YAxis
                    type="category"
                    dataKey="team"
                    fontSize="12"
                />
                <Tooltip />
                <Bar dataKey={dataKey} fill="#808080">
                    <LabelList
                        dataKey={dataKey}
                        position="center"
                        content={renderCustomizedLabel}
                    />
                    {dataSorted.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )

}

export default HorizontalBarChart