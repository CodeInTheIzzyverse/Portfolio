import "./Arrow.scss"

function Arrow({ direction, onClick }: { direction: "left" | "right", onClick?: () => void }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className={`arrow-${direction}`}
            onClick={onClick}
        >
            <path
                className="fill-foreground"
                d="M7 8H5v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2h-2v-2H9v-2H7z"
            />
        </svg>
    )
}

export default Arrow;