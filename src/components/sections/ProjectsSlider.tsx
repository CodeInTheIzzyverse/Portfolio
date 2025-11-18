import { Button } from "@/components/ui/pixelact-ui/button";
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import "./ProjectSlider.scss"
import { useMemo, useState } from "react";
import type ProjectModel from "@/models/Project";
import Projects from "@/data/projects.json";
import Skill from "../ui/Skill";

import { getAssets, normalizeName } from "@/utils/assetsHelper";

const images = getAssets('projects/images');
const miniatures = getAssets('projects/miniatures');
const icons = getAssets('skills', { normalizeKeys: true });

function ProjectsSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { projects } = useMemo(() => {
        const projects = Projects as ProjectModel[];
        projects.sort((a, b) => a.id - b.id);
        return {
            projects
        };
    }, []);
    
    const hanglePrevious = () => {
        if(currentIndex - 1 >= 0) {
            setCurrentIndex(prev => prev - 1);
        } else {
            setCurrentIndex(projects.length - 1);
        }
    };

    const handleNext = () => {
        if(currentIndex + 1 < projects.length) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCurrentIndex(0);
        }
    }

    const project = projects[currentIndex];
    const image = images[String(currentIndex)] ?? '';

    const projectSkills = project.abilities.map((ability) => {
        const key = normalizeName(ability);
        const skillIconPath = icons[key] ?? '';
        return {
            name: ability,
            icon: skillIconPath
        };
    });

    return (
        <section className="projects-slider" id="projects">
            <h2>Projects</h2>
            <h3>{project.name}</h3>
            <article className="container">
                <div className="project-info">
                    <h4>Abilities</h4>
                    <div className="skills-grid">
                        {projectSkills.map((skill) => (
                            <Skill key={skill.name} skill={{ name: skill.name, categories: [] }} isLearning={false} />
                        ))}
                    </div>
                    <h4>Description</h4>
                    <p>{project.description}</p>
                </div>
                <div className="project-console">
                    <div className="project-slider">
                        <HugeiconsIcon icon={ArrowLeft01Icon} onClick={hanglePrevious} />
                        <img src={image} alt={project.name} className="project-image" />
                        <HugeiconsIcon icon={ArrowRight01Icon} onClick={handleNext} />
                    </div>
                    <div className="actions">
                        <Button className="btn" variant="default"><a href={project.url} target="_blank" rel="noreferrer">Start</a></Button>
                        <Button className="btn" variant="default"><a href={project.github} target="_blank" rel="noreferrer">GitHub</a></Button>
                    </div>
                </div>
                <aside className="other-projects">
                    {projects.map((p, i) => (
                        <img src={miniatures[String(i)]} alt={p.name} key={i} className={currentIndex === i ? "active" : ""} onClick={() => setCurrentIndex(i)} />
                    ))}
                </aside>
            </article>
        </section>
    );
}

export default ProjectsSlider;