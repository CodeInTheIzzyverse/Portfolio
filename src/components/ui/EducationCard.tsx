import type EducationModel from "@/models/Education";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/pixelact-ui/card";
import { Avatar, AvatarImage } from "@/components/ui/pixelact-ui/avatar";
import "./EducationCard.scss"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/pixelact-ui/alert";
import { useEffect, useMemo, useRef, useState } from "react";

// utils
import { getAssets, normalizeName } from "@/utils/assetsHelper";
import ViewerPDF from "./ViewerPDF";

const icons = getAssets('education/icons', { normalizeKeys: true });
const certificates = getAssets('education/certificates');

function EducationCard({ educationItem }: { educationItem: EducationModel }) {
    const marqueeRef = useRef<HTMLSpanElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [alertIsOpen, setAlertIsOpen] = useState<boolean | null>(null);

    useEffect(() => {
        if (alertIsOpen !== null) {
            const timer = setTimeout(() => {
                setAlertIsOpen(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alertIsOpen]);

    useEffect(() => {
        const update = () => {
            const marquee = marqueeRef.current;
            const container = containerRef.current;
            if (!marquee || !container) return;

            const firstInner = marquee.querySelector<HTMLElement>('.marquee__inner');
            if (!firstInner) return;

            const innerWidth = firstInner.getBoundingClientRect().width;
            const containerWidth = container.getBoundingClientRect().width;

            const speed = 100; // px/s

            if (innerWidth > containerWidth + 1) {
                const distance = innerWidth;
                const duration = distance / speed;

                marquee.style.setProperty('--marquee-duration', `${duration}s`);
                marquee.style.setProperty('--marquee-distance', `${distance}px`);
                marquee.style.animation = `marquee ${duration}s linear infinite paused`;
            } else {
                marquee.style.removeProperty('--marquee-duration');
                marquee.style.removeProperty('--marquee-distance');
                marquee.style.animation = 'none';
                marquee.style.transform = 'translateX(0)';
            }
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [educationItem.title]);

    const handleMouseLeave = () => {
        const marquee = marqueeRef.current;
        if (marquee) {
            marquee.style.animationPlayState = 'paused';
            const animations = marquee.getAnimations();
            animations.forEach(animation => {
                animation.currentTime = 0;
            });
            marquee.style.transition = 'transform 0.5s ease-out';
            marquee.style.transform = 'translateX(0)';
        }
    };

    const handleMouseEnter = () => {
        const marquee = marqueeRef.current;
        if (marquee) {
            marquee.style.transition = 'none';
            marquee.style.animationPlayState = 'running';
        }
    };

    const iconUrl = icons[normalizeName(educationItem.institution)] ?? '';
    const certificateUrl = certificates[educationItem.id.toString()] ?? certificates[educationItem.id.toString() + '.pdf'] ?? '';
    const { hasCertificate } = useMemo(() => {
        return { hasCertificate: certificateUrl !== '' };
    }, [certificateUrl]);

    return (
        <>
            <Card
                className="education-card"
                onClick={() => {setIsOpen(true); if (!hasCertificate) setAlertIsOpen(true);}}
                ref={cardRef}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
            >
                <Avatar variant="square" size="medium">
                    <AvatarImage src={iconUrl} alt={educationItem.institution} className="image" />
                </Avatar>
                <CardHeader className="content">
                    <CardTitle className="title">
                        <div className="marquee-wrap" ref={containerRef} >
                            <span className="marquee" ref={marqueeRef} aria-hidden>
                                <span className="marquee__inner">{educationItem.title}</span>
                                <span className="marquee__inner">{educationItem.title}</span>
                            </span>
                        </div>
                    </CardTitle>
                    <CardDescription className="institution">{educationItem.institution}</CardDescription>
                </CardHeader>
                <CardContent>
                    <span className="date">{educationItem.date}</span>
                </CardContent>

            </Card>
            {isOpen && hasCertificate && <ViewerPDF url={certificateUrl} close={() => setIsOpen(false)} />}
            {isOpen && !hasCertificate && alertIsOpen && (
                <div className="alert">
                    <Alert variant="default">
                        <AlertTitle>Certificate not found</AlertTitle>
                        <AlertDescription>There is no certificate yet.</AlertDescription>
                    </Alert>
                </div>
            )}
        </>
    );
}

export default EducationCard;