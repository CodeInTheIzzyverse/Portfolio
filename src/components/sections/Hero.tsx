import "./Hero.scss"
import { Button } from "@/components/ui/pixelact-ui/button";

function Hero() {
	return (
		<section className="hero" id="about">
			<article className="info">
                <div className="info-content">
                    <h3>Hello! Welcome to my portfolio</h3>
                    <h1>I'm Isabela Bedoya</h1>
                    <p><span>Full stack delevoper, data analyst, AR and VR developer, and software engineer</span> with a passion for creating innovative solutions that solve real-world problems.</p>
                    <p>In my free time, I enjoy making videogames and music.</p>
                </div>
                <div className="info-social">
                    <a target="_blank" href="https://github.com/CodeInTheIzzyverse" rel="noreferrer"><Button className="btn">GitHub</Button></a>
                    <a target="_blank" href="https://www.linkedin.com/in/isabela-bedoya-gaviria-168308262/" rel="noreferrer"><Button className="btn">LinkedIn</Button></a>
                    <a target="_blank" href="https://wa.me/573194327423" rel="noreferrer"><Button className="btn">WhatsApp</Button></a>
                </div>
            </article>
            <article className="image">
                <div className="hero-image-placeholder">[Hero Image]</div>
            </article>
		</section>
	);
}

export default Hero;