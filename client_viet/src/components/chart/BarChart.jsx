import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
function BarChart({data, options, labels, title}) {
    ChartJS.register(BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale);
    options ??= {
      responsive: true,
      plugins: {
        title:{
          display: true,
          text:title,
          position: "bottom",
          align: "center",
        }
      },
    };
    const datas = {
        labels,
        datasets: data || []
    }
  return <><Bar options={options} data={datas} /></>;
}

export default BarChart;
