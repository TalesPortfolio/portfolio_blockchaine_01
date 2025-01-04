import { configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, goerli } from 'wagmi/chains';

const { chains, provider } = configureChains(
    [mainnet, goerli],
    [publicProvider()]
);

export const wagmiClient = createClient({
    autoConnect: true,
    provider,
});
