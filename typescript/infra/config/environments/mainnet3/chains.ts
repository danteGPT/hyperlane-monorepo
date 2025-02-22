import { ChainMap, ChainMetadata, chainMetadata } from '@hyperlane-xyz/sdk';

import { AgentChainNames, Role } from '../../../src/roles';

export const ethereumMainnetConfigs: ChainMap<ChainMetadata> = {
  bsc: {
    ...chainMetadata.bsc,
    transactionOverrides: {
      gasPrice: 7 * 10 ** 9, // 7 gwei
    },
  },
  avalanche: chainMetadata.avalanche,
  base: chainMetadata.base,
  polygon: {
    ...chainMetadata.polygon,
    blocks: {
      ...chainMetadata.polygon.blocks,
      confirmations: 3,
    },
    transactionOverrides: {
      maxFeePerGas: 1000 * 10 ** 9, // 500 gwei
      maxPriorityFeePerGas: 200 * 10 ** 9, // 100 gwei
      // gasPrice: 50 * 10 ** 9, // 50 gwei
    },
  },
  polygonzkevm: chainMetadata.polygonzkevm,
  scroll: chainMetadata.scroll,
  celo: chainMetadata.celo,
  arbitrum: chainMetadata.arbitrum,
  optimism: chainMetadata.optimism,
  ethereum: {
    ...chainMetadata.ethereum,
    blocks: {
      ...chainMetadata.ethereum.blocks,
      confirmations: 3,
    },
    transactionOverrides: {
      maxFeePerGas: 150 * 10 ** 9, // gwei
      maxPriorityFeePerGas: 5 * 10 ** 9, // gwei
    },
  },
  moonbeam: chainMetadata.moonbeam,
  gnosis: chainMetadata.gnosis,
  mantapacific: chainMetadata.mantapacific,
};

// Blessed non-Ethereum chains.
export const nonEthereumMainnetConfigs: ChainMap<ChainMetadata> = {
  // solana: chainMetadata.solana,
  neutron: chainMetadata.neutron,
};

export const mainnetConfigs: ChainMap<ChainMetadata> = {
  ...ethereumMainnetConfigs,
  // ...nonEthereumMainnetConfigs,
};

export type MainnetChains = keyof typeof mainnetConfigs;
export const supportedChainNames = Object.keys(
  mainnetConfigs,
) as MainnetChains[];
export const environment = 'mainnet3';

export const ethereumChainNames = Object.keys(
  ethereumMainnetConfigs,
) as MainnetChains[];

// Remove mantapacific, as it's not considered a "blessed"
// chain. It's not included in the scraper domains table,
// and we don't relay to mantapacific on the Hyperlane or RC contexts.
const hyperlaneContextRelayChains = ethereumChainNames.filter(
  (chainName) => chainName !== chainMetadata.mantapacific.name,
);

// Hyperlane & RC context agent chain names.
export const agentChainNames: AgentChainNames = {
  // Run validators for all chains.
  [Role.Validator]: supportedChainNames,
  [Role.Relayer]: hyperlaneContextRelayChains,
  [Role.Scraper]: hyperlaneContextRelayChains,
};
