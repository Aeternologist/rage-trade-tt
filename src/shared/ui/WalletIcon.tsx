import Image from 'next/image';
import { DefaultWalletIcon } from './WalletIcons';

export const WalletIcon = ({
    className,
    src,
    alt,
    size,
}: {
    className?: string;
    src?: string;
    alt?: string;
    size: number;
}) => {
    return src ? (
        <Image
            className={className}
            src={src}
            alt={alt || ''}
            width={size}
            height={size}
        />
    ) : (
        <DefaultWalletIcon className={className} size={size} />
    );
};
