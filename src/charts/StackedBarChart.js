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


const StackedBarChart = ( {data, dataKey} ) => {

    const renderCustomizedLabel = (props) => {
        const { content, ...rest } = props;
      
        return <Label {...rest} fontSize="12" fill="#FFFFFF" fontWeight="Bold" />
    }

    return (
        <ResponsiveContainer width={500} height={600}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{ left: 50, right: 50 }}
            >
                <XAxis hide type="number" />
                <YAxis
                    type="category"
                    dataKey="team"
                    fontSize="12"
                />
                <Tooltip />
                <Bar dataKey={dataKey} fill="#808080" >
                    <LabelList
                        dataKey={dataKey}
                        position="center"
                        content={renderCustomizedLabel}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )

}

export default StackedBarChart
