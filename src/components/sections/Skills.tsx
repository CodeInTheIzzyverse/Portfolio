import SkillSlider from "../ui/SkillSlider";
import { Accordion } from "@/components/ui/pixelact-ui/accordion";
import "./Skills.scss"

const categories = ["Frontend", "Backend", "Database", "Videogames / AR / VR", "Other"];

function Skills() {

    return (
        <section className="skills" id="skills">
            <article className="header">
                <h2>Skills</h2>
                <div className="badge"><div className="circle"></div> Currently learning</div>
            </article>
            <article className="categories">
                <Accordion type="single" collapsible defaultValue="item-0">
                    {categories.map((category, i) => (
                        <SkillSlider key={i} category={category} index={i} />
                    ))}
                </Accordion>
            </article>
        </section>
    );
}

export default Skills;