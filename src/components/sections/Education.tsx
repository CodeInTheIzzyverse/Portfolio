import { useMemo} from "react";
import EducationData from "@/data/education.json";
import type EducationModel from "@/models/Education";
import EducationCard from "../ui/EducationCard";
import "./Education.scss"

function Education() {
    const career = useMemo(() => EducationData.career as EducationModel[], []);
    const courses = useMemo(() => EducationData.courses as EducationModel[], []);

	return (
		<section className="education" id="education">
			<h2>Education</h2>
            <article className="education-container">
                {career.map((c, i) => (
                    <EducationCard key={i} educationItem={c} />
                ))}
                {courses.map((c, i) => (
                    <EducationCard key={i} educationItem={c} />
                ))}
            </article>
		</section>
	);
}

export default Education;