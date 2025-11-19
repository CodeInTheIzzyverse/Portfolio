import { useMemo, useState } from "react";
import Skills from "@/data/skills.json";
import type SkillModel from "@/models/Skill";
import Skill from "./Skill";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/pixelact-ui/accordion";
import "./SkillSlider.scss";
import Arrow from "./Arrow";

const ITEMS_PER_PAGE = 7;

function SkillSlider({ category, index }: { category: string, index: number }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { allSkills, visibleSkills, hasMoreLeft, hasMoreRight } = useMemo(() => {
        const learnedSkills = (Skills as { learned: SkillModel[] }).learned.filter((skill) =>
            skill.categories.includes(category)
        );
        const learningSkills = (Skills as { learning: SkillModel[] }).learning.filter((skill) =>
            skill.categories.includes(category)
        );

        const combined = [...learnedSkills, ...learningSkills];

        const visible = combined.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);

        const moreLeft = currentIndex > 0;
        const moreRight = currentIndex + ITEMS_PER_PAGE < combined.length;

        return {
            allSkills: combined,
            visibleSkills: visible,
            hasMoreLeft: moreLeft,
            hasMoreRight: moreRight
        };
    }, [category, currentIndex]);

    const handlePrevious = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev =>
            Math.min(allSkills.length - ITEMS_PER_PAGE, prev + 1)
        );
    };

    const shouldShowArrows = allSkills.length > ITEMS_PER_PAGE;

    return (
        <AccordionItem className="category-skills" value={`item-${index}`}>
            <AccordionTrigger>{category}</AccordionTrigger>
            <AccordionContent>
                <div className="skills-slider">
                    {shouldShowArrows && (
                        <button
                            className="arrow-button"
                            onClick={handlePrevious}
                            disabled={!hasMoreLeft}
                            aria-label="Previous skills"
                        >
                            <Arrow direction="left" />
                        </button>
                    )}
                    <div className="skills-items">
                        {visibleSkills.map((s) => (
                            <Skill key={s.name} skill={s} isLearning={allSkills.indexOf(s) >= (Skills as { learned: SkillModel[] }).learned.filter((skill) => skill.categories.includes(category)).length} />
                        ))}
                    </div>
                    {shouldShowArrows && (
                        <button
                            className="arrow-button"
                            onClick={handleNext}
                            disabled={!hasMoreRight}
                            aria-label="Next skills"
                        >
                            <Arrow direction="right" />
                        </button>
                    )}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

export default SkillSlider;