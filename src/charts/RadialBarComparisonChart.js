import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import RadarComparisonChart from './RadarComparisonChart';


const RadialBarComparisonChart = ( {data, dataKey} ) => {

    const style = {
        top: '50%',
        right: 0,
        transform: 'translate(+10%, -50%)',
        lineHeight: '20px',
      };

    return (
        <ResponsiveContainer width={400} height={400}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="40%" barSize={16} data={data} startAngle={180} endAngle={0}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise
            dataKey={dataKey}
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
    )
}

export default RadialBarComparisonChart
