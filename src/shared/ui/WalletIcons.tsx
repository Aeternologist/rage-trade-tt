import { Wallet } from 'solar-icon-set';

export const DefaultWalletIcon = ({
    className,
    size,
}: {
    className?: string;
    size?: number;
}) => {
    return <Wallet className={className} iconStyle="BoldDuotone" size={size} />;
};

export const WalletConnectIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <g clipPath="url(#clip0_1_6335)">
                <path
                    d="M18.3529 0H5.64706C2.52827 0 0 2.52827 0 5.64706V18.3529C0 21.4717 2.52827 24 5.64706 24H18.3529C21.4717 24 24 21.4717 24 18.3529V5.64706C24 2.52827 21.4717 0 18.3529 0Z"
                    fill="#3B99FC"
                />
                <path
                    d="M7.19121 8.89216C9.84705 6.23631 14.1531 6.23631 16.8089 8.89216L17.1285 9.21178C17.2614 9.34459 17.2614 9.55988 17.1285 9.69267L16.0351 10.7861C15.9687 10.8525 15.861 10.8525 15.7947 10.7861L15.3548 10.3462C13.502 8.49343 10.4981 8.49343 8.64528 10.3462L8.17423 10.8173C8.10784 10.8837 8.00018 10.8837 7.93378 10.8173L6.84037 9.72387C6.70758 9.59107 6.70758 9.37577 6.84037 9.24298L7.19121 8.89216ZM19.0701 11.1534L20.0432 12.1266C20.1761 12.2594 20.1761 12.4747 20.0432 12.6075L15.6553 16.9955C15.5226 17.1282 15.3073 17.1282 15.1745 16.9955L12.0602 13.8812C12.027 13.848 11.9732 13.848 11.94 13.8812L8.82574 16.9955C8.69295 17.1282 8.47764 17.1282 8.34485 16.9955L3.95677 12.6074C3.82398 12.4746 3.82398 12.2593 3.95677 12.1265L4.92991 11.1534C5.0627 11.0206 5.27801 11.0206 5.4108 11.1534L8.52514 14.2677C8.55833 14.3009 8.61216 14.3009 8.64535 14.2677L11.7596 11.1534C11.8923 11.0206 12.1076 11.0206 12.2404 11.1534C12.2404 11.1534 12.2404 11.1534 12.2404 11.1534L15.3548 14.2677C15.3879 14.3009 15.4417 14.3009 15.475 14.2677L18.5893 11.1534C18.7221 11.0206 18.9374 11.0206 19.0701 11.1534Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_1_6335">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};
