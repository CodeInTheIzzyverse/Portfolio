import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Hero from "@/components/sections/Hero";
import ProjectsSlider from "@/components/sections/ProjectsSlider";
import Skills from "@/components/sections/Skills";

function Home() {
	return (
		<main className="home">
			<Hero />
			<Skills />
			<ProjectsSlider />
			<Education />
			<Contact />
		</main>
	);
}

export default Home;