import { Radar } from "react-chartjs-2"
import ChartDataLabels from 'chartjs-plugin-datalabels';


export const RadarChart = ({ chartData }) => {
  return (
    <div>
        <Radar
            data={chartData}
            options={{
                scale: {
                    ticks: {
                        min: 0,
                        max: 20,
                        stepSize: 2,
                    }
                }
        }}
        />
    </div>
  )
}