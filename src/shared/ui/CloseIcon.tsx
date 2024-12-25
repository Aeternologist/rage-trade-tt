export const CloseIcon = ({
    className,
    fill,
}: {
    className?: string;
    fill?: string;
}) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path d="M12 4L4 12Z" fill={fill || '#A5A9C8'} />
            <path
                d="M12 4L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 4L12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
