import { Bar } from "react-chartjs-2"
import ChartDataLabels from 'chartjs-plugin-datalabels';


export const BarChart = ({ chartData }) => {
  return (
    <div>
        <Bar
            data={chartData}
            options={{
                indexAxis: 'y',
                scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true
                    }
                  },
            }}
        />
    </div>
  )
}