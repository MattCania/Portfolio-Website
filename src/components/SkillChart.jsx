import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SkillChart () {
		const data = {
			labels: ["ReactJS", "NodeJS", "MySQL", "GdScript/Godot", "Java", "C"],
			datasets: [
				{
					label: "Projects",
					data: [9, 8, 7, 4, 5, 2],
					backgroundColor: "#52525c",
					borderColor: "#09090b",
					borderWidth: 1,
				},
			],
		};

		const options = {

			indexAxis: 'y',
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false, position: "top" },
				tooltip: { enabled: true },
			},

			scales: {
				x: {
					beginAtZero: true,
					grid: { display: false },
				},
				y: {
					grid: { display: false },
				},
			},
		};

		return (
			<div style={{ width: "100%", height: "400px" }}>
				<Bar data={data} options={options} />
			</div>
		);
	};