import { useEffect, useState } from "react";

export default function MouseEffect({ circleCount, circlePx, lerp, color, isInView }) {
	const numCircles = circleCount || 250;
	const circleSize = circlePx || 2;
	const lerpFactor = lerp || 0.75;

	const [scaleClick, setScaleClick] = useState(false);

	const getBackgroundColor = () => {
		if (isInView["welcomeContent"] || isInView["projectsContent"]) return "rgb(255, 255, 255)";
		if (isInView["aboutContent"] || isInView["skillsContent"]) return "#09090b"; 
		return "white";
	};

	const [positions, setPositions] = useState(
		Array.from({ length: numCircles }, () => ({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		}))
	);

	const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

	useEffect(() => {
		const handleMouseMove = (event) => {
			setMousePos({
				x: event.clientX,
				y: event.clientY
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	useEffect(() => {
		let animationFrame;

		const updatePositions = () => {
			setPositions((prevPositions) => {
				const updatedPositions = [...prevPositions];

				updatedPositions[0] = {
					x: updatedPositions[0].x + (mousePos.x - updatedPositions[0].x) * lerpFactor,
					y: updatedPositions[0].y + (mousePos.y - updatedPositions[0].y) * lerpFactor
				};

				for (let i = 1; i < updatedPositions.length; i++) {
					updatedPositions[i] = {
						x: updatedPositions[i].x + (updatedPositions[i - 1].x - updatedPositions[i].x) * lerpFactor,
						y: updatedPositions[i].y + (updatedPositions[i - 1].y - updatedPositions[i].y) * lerpFactor
					};
				}

				return updatedPositions;
			});

			animationFrame = requestAnimationFrame(updatePositions);
		};

		animationFrame = requestAnimationFrame(updatePositions);
		return () => cancelAnimationFrame(animationFrame);
	}, [mousePos]);

	useEffect(() => {
		const handleClick = (event) => {
			setScaleClick(true);
			setTimeout(() => setScaleClick(false), 500);
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick); // Cleanup on unmount
		};
	}, []);

	return (
		<section className="flex justify-center items-center w-screen h-screen fixed z-[0]">
			{positions.map((pos, index) => {
				const scale = 1 - index * 0.01;
				const dynamicColor = color || getBackgroundColor();

				return (
					<div
						key={index}
						className={`circle rounded-full absolute transition-all duration-500 shadow-2xl shadow-teal-400`}
						style={{
							width: `${circleSize}px`,
							height: `${circleSize}px`,
							backgroundColor: color || dynamicColor,
							left: `${pos.x - circleSize / 2}px`,
							top: `${pos.y - circleSize / 2}px`,
							transform: `scale(${scale})`,
							position: "absolute",
							transition: "background-color 0.5s ease, scale 500ms ease",
							opacity: "50%",
							scale: `${scaleClick ? 20 : 1}`,
							clipPath: "circle(50% at center)"
						}}
					/>
				);
			})}
		</section>
	);
}
