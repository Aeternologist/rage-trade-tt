'use client';

import { useAccountTokensContext } from '@/widgets/AccountInfo';

const Kek = () => {
    const kek = useAccountTokensContext();
    console.log({ kek });
    return <div>kek</div>;
};

export default Kek;
