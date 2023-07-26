import { defineConfig } from '@wagmi/cli'
import {MultSigWalletAbi} from './src/Contracts/MultiSigWallet';
import { react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'


export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      abi: MultSigWalletAbi,
      name: 'MultiSigWallet',
      address: {
        [chains.hardhat.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
      },
    },
  ],
  plugins: [react()],
})
