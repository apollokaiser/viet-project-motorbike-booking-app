import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
function PieChart({data, options, labels, title}) {
    ChartJS.register(ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale);
    options ??= {
      responsive: true,
      radius:"100%",
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
  return <><Pie options={options} data={datas} /></>;
}

export default PieChart;
