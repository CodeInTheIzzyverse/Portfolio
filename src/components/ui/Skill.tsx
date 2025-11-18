import type SkillModel from "@/models/Skill";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/pixelact-ui/tooltip";
import './Skill.scss';

import { getAssets, normalizeName } from "@/utils/assetsHelper";

const icons = getAssets('skills', { normalizeKeys: true });

function Skill({ skill, isLearning }: { skill: SkillModel, isLearning: boolean }) {
    const key = normalizeName(skill.name);
    const skillIconPath = icons[key] ?? '';

    return (
        <div className={`skill ${isLearning ? "learning" : "learned"}`}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <img className="icon" src={skillIconPath} alt={skill.name} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <span className="name">{skill.name}</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

export default Skill;