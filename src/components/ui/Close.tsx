function Close({ onClick, className }: { onClick: () => void, className?: string }) {
    const pixelatedCrossPath = "M5 6L6 5L12 11L18 5L19 6L13 12L19 18L18 19L12 13L6 19L5 18L11 12L5 6Z";
    
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className={className}
            onClick={onClick}
        >
            <path
                className="fill-foreground"
                d={pixelatedCrossPath}
            />
        </svg>
    )
}

export default Close;