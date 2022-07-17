import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";



const StatChart = ({ data }) => {
  Chart.register(ArcElement);
  const arrData = [data.Good,data.Bad ,data.Pollen, data.Mite, data.Enemy, data.Queen];
  return (
    <Pie
      data={{
        labels: ["Good","Bad", "Pollen", "Mite", "Enemy", "Queen"],
        datasets: [
          {
            data: arrData,
            backgroundColor: [
              "#8ab17d",
              "#f4a261",
              "#e9c46a",
              "#287271",
              "#e76f51",
              "#2a9d8f",
            ],
            hoverBackgroundColor: [
              "#8ab17d",
              "#f4a261",
              "#e9c46a",
              "#287271",
              "#e76f51",
              "#2a9d8f",
            ],
          },
        ],
      }}
      width={400}
      height={600}
    ></Pie>
  );
};

export default StatChart;
