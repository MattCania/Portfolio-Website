import React, { useState, useEffect } from 'react';
import ProfileImg from '../assets/profileImg.png';
import PandoraImg1 from '../assets/projects/pandora/PandoraSS1.png'
import GitFit1 from '../assets/projects/gitFit/Gitfit1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faGithub, faItchIo, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faAngleDoubleRight, faForward, faPhone, faWindowMaximize, faBuilding } from '@fortawesome/free-solid-svg-icons';
import Header from '../partials/Header';
import MouseEffect from './MouseEffect';
import SkillChart from '../components/SkillChart'
export default function ProfilePage() {
	const [isHover, setIsHover] = useState(false)
	const [customColor, setCustomColor] = useState(null)
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

	useEffect(() => {
		const handleResize = () => {
		  setIsMobile(window.innerWidth <= 1024);
		};
	
		window.addEventListener('resize', handleResize);
		
		return () => {
		  window.removeEventListener('resize', handleResize);
		};
	  }, []);

	const [isInView, setIsInView] = useState({
		welcomeContent: false,
		aboutContent: false,
		projectsContent: false,
		skillsContent: false,
	});

	const scrollToSection = (id) => {
		const section = document.getElementById(id);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	}


	const handleSectionInView = (entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				setIsInView(prevState => ({
					...prevState,
					[entry.target.id]: true,
				}));
			} else {
				setIsInView(prevState => ({
					...prevState,
					[entry.target.id]: false,
				}));
			}
		});
	};

	useEffect(() => {
		const observer = new IntersectionObserver(handleSectionInView, {
			root: null,
			rootMargin: '0px',
			threshold: 0.5,
		});

		const sections = document.querySelectorAll('.section');
		sections.forEach(section => observer.observe(section));

		return () => {
			sections.forEach(section => observer.unobserve(section));
		};
	}, []);

	const skills = [
		{
			link: 'https://www.instagram.com/mattcans/', icon: faInstagram
		},
		{
			link: 'https://www.facebook.com/Matthew.Cania24', icon: faFacebook
		},
		{
			link: 'https://github.com/MattCania', icon: faGithub
		},
		{
			link: 'https://itch.io/dashboard', icon: faItchIo
		},
		{
			link: 'https://www.linkedin.com/in/cania-matthew-gabriel-m-284648306/', icon: faLinkedin
		},
	];

	const navigation = [
		{
			label: 'About', id: 'about'
		},
		{
			label: 'Projects', id: 'projects'
		},
		{
			label: 'Skills', id: 'skills'
		},
	]


	return (
		<section
			className='flex flex-col justify-start items-center w-full min-h-screen bg-zinc-950 overflow-x-hidden scroll-smooth'
		>
			<MouseEffect circleCount={isMobile ? 50 : 100} circlePx={isMobile ? 2 : 5} lerp={isHover ? 0.5 : 0.75} isInView={isInView} color={customColor} />
			<Header scrollToSection={scrollToSection} navigation={navigation} isInView={isInView} />
			<div
				id='welcome'
				className={`flex flex-col justify-center items-center h-screen w-full gap-4 flex-shrink-0 bg-zinc-950`}
			>

				<div
					id='welcomeContent'
					className={`section flex flex-col ${isInView.welcomeContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 w-3/4 lg:w-1/3 justify-start items-start z-1`}
				>

					<h1
						className={`section text-white font-black text-xl md:text-2xl lg:text-5xl ${isInView.welcomeContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'} text-6xl font-semibold transition-all duration-[2000ms]`}
					>
						Matthew Cania
					</h1>
					<p
						className={`section flex justify-start items-center gap-2 w-full h-auto text-white text-md lg:text-2xl border-b-1 border-white ${isInView.welcomeContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'} font-semibold transition-all duration-[3000ms]`}
					>
						Full Stack Devloper
						<button
							className='flex justify-center items-center w-6 h-6 cursor-pointer hover:text-teal-400 transition-all duration-300 outline-none'
							onClick={() => scrollToSection('about')}
							onMouseOver={() => setIsHover(true)}
							onMouseLeave={() => setIsHover(false)}
						>
							<FontAwesomeIcon icon={faAngleDoubleRight} />
						</button>
					</p>
					<div

						className={`section flex justify-start items-center gap-2 ${isInView.welcomeContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'} font-semibold transition-all duration-[4000ms] p-1`}
					>
						{skills.map((item, index) => (
							<a
								key={index}
								className='flex text-center justify-center items-center text-xl lg:text-2xl text-teal-400 rounded-md p-1 hover:bg-teal-400 hover:text-zinc-950 transition-all duration-300'
								onMouseOver={() => setIsHover(true)}
								onMouseLeave={() => setIsHover(false)}
								href={item.link}
							>
								<FontAwesomeIcon icon={item.icon} />
							</a>
						))}
					</div>

				</div>
			</div>

			<div
				id='about'
				className={`flex flex-col justify-center items-center h-screen w-full gap-4 flex-shrink-0 bg-white`}
			>
				<div
					id='aboutContent'
					className={`section flex flex-col justify-center items-start w-5/6 lg:w-1/2 ${isInView.aboutContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
				>
					<h1
						className={`section ${isInView.aboutContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'} text-3xl md:text-4xl lg:text-6xl font-semibold transition-all duration-[2000ms]`}
					>
						I create websites
					</h1>

					<h1
						className={`section ${isInView.aboutContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'} text-3xl md:text-4xl lg:text-6xl font-semibold transition-all duration-[3000ms]`}
					>
						That solves
					</h1>
					<h1
						className={`section ${isInView.aboutContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'} text-3xl md:text-4xl lg:text-6xl font-semibold transition-all duration-[4000ms]`}
					>
						Real world problems
					</h1>
					<button
						className={`section outline-none flex text-center justify-center items-center my-2 ${isInView.aboutContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'} text-2xl md:text-3xl lg:text-4xl font-semibold rounded-xl hover:bg-zinc-950 hover:text-white cursor-pointer`}
						style={{
							transition: 'transform 4500ms ease, opacity 4500ms ease, color 1000ms ease, background-color 1000ms ease',
							transform: isInView.aboutContent ? 'translateY(0)' : 'translateY(-20px)'
						}}
						onClick={() => scrollToSection('projects')}
						onMouseOver={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}
					>
						<FontAwesomeIcon icon={faForward} />
					</button>
				</div>
			</div>

			<div
				id='projects'
				className={`flex flex-col justify-center items-center h-screen w-full gap-4 flex-shrink-0 bg-zinc-950 p-2 lg:p-0`}

				style={{
					height: 'auto',
					minHeight: '100vh'
				}}
			>
				<div
					id='projectsContent'
					className={`section flex h-full ${isInView.projectsContent ? 'opacity-100' : 'opacity-0'} w-full lg:w-3/4 transition-all duration-1000`}
				>
					<div
						className={`section flex flex-col justify-center items-center h-full w-full gap-4 ${isInView.projectsContent ? 'opacity-100 transform translate-x-0' : 'opacity-0 translate-x-[-20px]'} transition-all duration-[2000ms]`}
					>
						<div
							className={`section flex flex-col md:flex-row justify-start items-center h-1/2 md:h-2/5 w-full ${isInView.projectsContent ? 'opacity-100 transform translate-x-0' : 'opacity-0 translate-x-[-50px]'} transition-all duration-[5000ms]`}
						>
							<div
								className='flex justify-center items-center flex-col w-full md:w-1/2 h-full'
							>

								<h1
									className='flex justify-center items-center text-5xl w-full h-60 md:h-72 rounded-2xl relative text-green-300 border-1 border-green-300 italic font-medium bg-transparent transition-all duration-500'
								>
									Pandora
								</h1>
								<a
									className='w-full md:w-1/2 h-1/2 md:h-full absolute hover:opacity-0 transition-all duration-500'
									onMouseOver={() => setCustomColor('#7bf1a8')}
									onMouseLeave={() => setCustomColor(null)}
									href=""
								>
									<img
										className='w-full h-full rounded-xl absolute'
										src={PandoraImg1}
										alt=""
									/>
								</a>
							</div>
							<div
								className='flex flex-col w-full md:w-1/2 p-2'
							>
								<h1
									className='text-[clamp(1.5rem,5vh,3rem)] text-white font-medium'
								>
									Pandora: Finance Bookkeeping System
								</h1>
								<p
									className='flex flex-col w-full text-white text-text-[clamp(1rem,2vh,2rem)] font-thin'
								>
									A financial bookkeeping website designed for any businesses of any sizes, handles wallet management, inventory, transaction records, statistical analytics and many more.
									<b>
										Made with React JS and NextJS framework along with NodeJS, Sequelize, and MySQL.
									</b>
								</p>
							</div>
						</div>

						<div
							className={`section flex flex-col md:flex-row justify-end items-center h-1/2 md:h-2/5 w-full ${isInView.projectsContent ? 'opacity-100 transform translate-x-0' : 'opacity-0 translate-x-[-50px]'} transition-all duration-[3000ms]`}
						>
							<div
								className='flex flex-col w-full md:w-1/2 p-2'
							>
								<h1
									className='text-[clamp(1.5rem,5vh,3rem)] text-white font-medium'
								>
									GitFit: Goal Based Management Tool
								</h1>
								<p
									className='flex flex-col w-full text-white text-[clamp(1rem,2vh,2rem)] font-thin'
								>
									A health and career management app inspired by GitHub, allowing users to establish health, career, and talent based goals health manager, scheduling system, and progress level of productivity. Promoting work productivity while ensuring your health
									<b>
										Made with React JS and TailwindCSS framework along with NodeJS, Sequelize, and PostgreSQL.
									</b>
								</p>
							</div>

							<div
								className='flex justify-center items-center flex-col w-full md:w-1/2 h-full'
							>

							<h1
							
								className='flex justify-center items-center text-5xl w-full h-60 md:h-72 rounded-2xl relative text-teal-300 border-1 border-teal-300 italic font-medium bg-transparent transition-all duration-500'
								>
								GitFit
							</h1>

							<a
								className='w-full md:w-1/2 h-60 md:h-full absolute'
								href=""
								>

								<img
									className='w-full h-full rounded-xl hover:opacity-0 transition-all duration-500'
									onMouseOver={() => setCustomColor('#00d5be')}
									onMouseLeave={() => setCustomColor(null)}
									src={GitFit1}
									alt=""
									/>
							</a>
									</div>
						</div>

					</div>
				</div>
			</div>

			<div
				id='skills'
				className={`flex justify-center items-center h-screen w-full gap-4 flex-shrink-0 bg-white p-2 lg:p-0`}
				style={{
					height: 'auto',
					minHeight: '100vh'
				}}
			>
				<div
					id='skillsContent'
					className={`section flex flex-col lg:flex-row justify-center items-center gap-4 h-full w-full lg:w-3/4 z-1 ${isInView.skillsContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1500`}
				>
					<div
						id='skillsContent'
						className={`section flex flex-col justify-center items-center w-5/6 lg:w-1/3 h-3/4 ${isInView.skillsContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1500`}
					>
						<img
							className='w-1/2 md:w-1/4 lg:w-3/4 rounded-full z-1'
							src={ProfileImg}
							alt=""
						/>

						<h1
							className='w-full text-center items-center justify-center text-4xl font-semibold text-black z-1 my-4'
						>
							Matthew Cania
						</h1>
						<ul
							className='flex flex-col justify-start items-start w-full font-medium z-1'
						>
							<li>matthewgab24@gmail.com</li>
							<li>11647 ph.6 Purok II 6 Area D Brgy.178 Camarin Caloocan City</li>
							<li>
								<a
									href="https://github.com/MattCania"
									className='hover:underline hover:bg-black hover:text-white rounded-sm transition-all duration-500'
									onMouseOver={() => setIsHover(true)}
									onMouseLeave={() => setIsHover(false)}
								>
									https://github.com/MattCania
								</a>
							</li>
						</ul>

					</div>

					<div
						id='skillsContent'
						className={`section flex flex-col justify-center items-start gap-2 h-3/4 w-full lg:w-3/4 ${isInView.skillsContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
					>
						<SkillChart />

					</div>
				</div>

			</div>

		</section>
	);
}
