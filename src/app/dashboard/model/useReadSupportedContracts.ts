import type { erc20Abi, ReadContractParameters } from 'viem';
import { formatUnits } from 'viem';
import { useReadContract, useReadContracts } from 'wagmi';
import { z } from 'zod';
import {
    SUPPORTED_CONTRACTS_INFO,
    type SupportedChainsId,
} from '@/shared/constants/supportedTokens';
import {
    ContractReadResponseSuccess,
    type Address,
    type ContractReadResponse,
} from '@/shared/lib/zod';

const BalanceSchema = z.bigint();

const TokenDataSchema = ContractReadResponseSuccess.array();
type TokenDataSchema = z.infer<typeof TokenDataSchema>;

const formatTokenData = (
    data: ContractReadResponse[],
    contractAddressesInfo: {
        chainId: SupportedChainsId;
        address: Address;
    }[],
) => {
    const tokenData = TokenDataSchema.parse(data);
    return tokenData.map(({ result }, i) => {
        const contractInfo = contractAddressesInfo[i];
        return {
            chainId: contractInfo.chainId,
            address: contractInfo.address,
            tokenBalance: BalanceSchema.parse(result),
        };
    });
};

const getReadContractsPayload = (
    chainId: SupportedChainsId,
    accountAddress: `0x${string}`,
) => {
    return SUPPORTED_CONTRACTS_INFO[chainId].map(
        (contract) =>
            ({
                abi: contract.abi,
                address: contract.address,
                functionName: 'balanceOf',
                args: [accountAddress],
                chainId,
            }) satisfies ReadContractParameters<
                typeof erc20Abi,
                'balanceOf'
            > & {
                chainId: SupportedChainsId;
            },
    );
};

export const useReadSupportedContracts = ({
    chainIds,
    address,
}: {
    chainIds: SupportedChainsId[];
    address: `0x${string}` | undefined;
}) => {
    const contracts =
        address &&
        chainIds.flatMap((chainId) =>
            getReadContractsPayload(chainId, address),
        );

    const { data } = useReadContracts({
        contracts,
        query: {
            enabled: !!contracts,
        },
    });
    const contractAddressesInfo = chainIds.flatMap((chainId) =>
        SUPPORTED_CONTRACTS_INFO[chainId].map((c) => ({
            chainId,
            address: c.address,
        })),
    );
    const accountTokensData =
        data && formatTokenData(data, contractAddressesInfo);
    return accountTokensData;
};
