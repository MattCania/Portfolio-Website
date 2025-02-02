
export default function Header({ scrollToSection, navigation, isInView }) {
	const isWhiteText = isInView["welcomeContent"] || isInView["projectsContent"];

	return (
		<header className='flex justify-center lg:justify-end items-center w-full lg:w-3/4 h-10 gap-2 bg-transparent overflow-hidden z-2 fixed'>
			{navigation.map((item, index) => (
				<button
					key={index}
					onClick={() => scrollToSection(item.id)}
					className={`font-thin flex justify-center items-center w-auto px-4 rounded-lg cursor-pointer text-sm outline-none
						${isWhiteText ? 'text-white' : 'text-black'}
						${isWhiteText ? 'hover:bg-white hover:text-zinc-950' : 'hover:bg-zinc-950 hover:text-white'}`}
					style={{ transition: 'color 500ms ease, background-color 500ms ease' }}
				>
					{item.label}
				</button>
			))}
			<a 
				className={`font-thin flex justify-center items-center w-auto px-4 rounded-lg cursor-pointer text-sm outline-none
					${isWhiteText ? 'text-white' : 'text-black'}
					${isWhiteText ? 'hover:bg-white hover:text-zinc-950' : 'hover:bg-zinc-950 hover:text-white'}`}
				style={{ transition: 'color 500ms ease, background-color 500ms ease' }}
				href="/Matthew Cania Resume.pdf"
				download="Matthew Cania Resume.pdf"
			>
				Resume
			</a>
		</header>
	);
}
