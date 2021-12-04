import { useState, useCallback } from "react"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip} from 'recharts';


const COLORS = ['#20e0e3', '#808080', '#d619e0'];

const renderActiveShape = (props, team1, team2) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    console.log("color", payload.color)
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 6) * cos;
    const sy = cy + (outerRadius + 6) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 20;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
    <g>
        <text style={{fontSize: "80%"}} x={cx} y={cy} dy={8} textAnchor="middle" fill={payload.color}>
        {payload.team}
        </text>
        <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
        />
        <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.color}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={payload.color} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />
        <text style={{fontSize: "90%"}} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{` ${(value*100).toFixed(2)}%`}</text>
        <text style={{fontSize: "80%"}} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(1/percent).toFixed(2)})`}
        </text>
    </g>
    );
};

const PercentLabeledPieChart = ({data, team1, team2}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
      (_, index) => {
        setActiveIndex(index);
      },
      [setActiveIndex]
    );

    return (
        <ResponsiveContainer width={340} height={300}>
            <PieChart>
            <Pie
                activeIndex={activeIndex}
                activeShape={props => renderActiveShape(props, team1, team2)}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
                onMouseEnter={onPieEnter}
            />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </PieChart>
        </ResponsiveContainer>
    )

}
export default PercentLabeledPieChart