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

const SymbolSchema = z.string();
const NameSchema = z.string();
const BalanceSchema = z.bigint();
const DecimalsSchema = z.number().int();

const TokenDataSchema = ContractReadResponseSuccess.array();
type TokenDataSchema = z.infer<typeof TokenDataSchema>;

const formatTokenData = (
    data: ContractReadResponse[],
    chainId: SupportedChainsId,
) => {
    const addresses = SUPPORTED_CONTRACTS_INFO[chainId].map((c) => c.address);
    const tokenData = TokenDataSchema.parse(data);
    const result = new Array<{
        address: Address;
        symbol: string;
        name: string;
        tokenBalance: string;
    }>();
    for (let i = 0; i < tokenData.length; i += 4) {
        const address = addresses[i / 4];
        const symbol = SymbolSchema.parse(tokenData[i].result);
        const name = NameSchema.parse(tokenData[i + 1].result);
        const balance = BalanceSchema.parse(tokenData[i + 2].result);
        const decimals = DecimalsSchema.parse(tokenData[i + 3].result);
        result.push({
            address,
            symbol,
            name,
            tokenBalance: formatUnits(balance, decimals),
        });
    }
    return result;
};

const getReadContractsPayload = (
    chainId: SupportedChainsId,
    accountAddress: `0x${string}`,
) => {
    return SUPPORTED_CONTRACTS_INFO[chainId].reduce((acc, contract) => {
        const symbolReadContractParameters = {
            abi: contract.abi,
            address: contract.address,
            functionName: 'symbol',
            chainId,
        } satisfies ReadContractParameters<typeof erc20Abi, 'symbol'> & {chainId: SupportedChainsId};

        const nameReadContractParameters = {
            abi: contract.abi,
            address: contract.address,
            functionName: 'name',
            chainId
        } satisfies ReadContractParameters<typeof erc20Abi, 'name'> & {chainId: SupportedChainsId};

        const balanceOfReadContractParameters = {
            abi: contract.abi,
            address: contract.address,
            functionName: 'balanceOf',
            args: [accountAddress],
            chainId
        } satisfies ReadContractParameters<typeof erc20Abi, 'balanceOf'>& {chainId: SupportedChainsId};

        const decimalsReadContractParameters = {
            abi: contract.abi,
            address: contract.address,
            functionName: 'decimals',
            chainId
        } satisfies ReadContractParameters<typeof erc20Abi, 'decimals'>& {chainId: SupportedChainsId};

        acc.push(
            symbolReadContractParameters,
            nameReadContractParameters,
            balanceOfReadContractParameters,
            decimalsReadContractParameters,
        );
        return acc;
    }, new Array<ReadContractParameters<typeof erc20Abi, 'symbol' | 'balanceOf' | 'decimals' | 'name'>>());
};

export const useReadSupportedContracts = ({
    chainId,
    address,
}: {
    chainId: SupportedChainsId | undefined;
    address: `0x${string}` | undefined;
}) => {
    const contracts =
        chainId && address && getReadContractsPayload(chainId, address);

        const kek = useReadContract({chainId: })

    const { data } = useReadContracts({
        contracts,
        query: {
            enabled: !!contracts,
        },
    });
    const accountTokensData = data && formatTokenData(data, chainId!);
    return accountTokensData;
};
