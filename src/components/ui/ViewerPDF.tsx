import "./ViewerPDF.scss"
import Close from "./Close";

function ViewerPDF({ url, close }: { url: string, close: () => void }) {
    if (!url) return null;

    return (
        <>
            <div className="viewer-bg" onClick={close}></div>
            <div className="pdf-viewer">
                <Close onClick={close} className="close-btn" />
                <iframe src={url} title="pdf" />
            </div>
        </>
    );
}

export default ViewerPDF;