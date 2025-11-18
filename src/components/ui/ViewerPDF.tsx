
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import "./ViewerPDF.scss"

function ViewerPDF({ url, close }: { url: string, close: () => void }) {
    if (!url) return null;

    return (
        <>
            <div className="viewer-bg" onClick={close}></div>
            <div className="pdf-viewer">
                <HugeiconsIcon icon={Cancel01Icon} onClick={close} className="close-btn" />
                <iframe src={url} title="pdf" />
            </div>
        </>
    );
}

export default ViewerPDF;