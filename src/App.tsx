/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import { useMultiSigWalletGetBalance, useMultiSigWalletDeposit, usePrepareMultiSigWalletDeposit } from './generated';
import Nav from "./Components/Nav";
import Withdraws from "./Components/Withdraws"
import Actions from "./Components/Actions";
import {

  useAccount,
  useBalance
} from 'wagmi'
import { useEffect, useState } from "react";
import DepositModal from "./Components/DepositModal";
import WidthdrawModal from "./Components/WidthdrawModal";

function App() {
  const { address } = useAccount();
  const { data: contractBalance } = useMultiSigWalletGetBalance({ watch: true });
  const [showDepositModal, setShowDepositModal] = useState<boolean | undefined>(false);
  const [showWidthdrawModal, setShowWithdrawModal] = useState<boolean | undefined>(false);
  
  const { data: balance } = useBalance({
    address: address,
  })
  
  return (
    <Flowbite>
      <div className='container mx-auto my-5'>
        <Nav />
        <div className="m-5">
          {address && <>
            <Actions
              setShowDepositModal={setShowDepositModal}
              showDepositModal={showDepositModal}
              setShowWithdrawModal={setShowWithdrawModal}
              showWidthdrawModal={showWidthdrawModal}
              contractBalance={contractBalance} />
            <Withdraws />
            <DepositModal
              setShowDepositModal={setShowDepositModal}
              showDepositModal={showDepositModal}
              balance = { (typeof balance === 'undefined') ? "0" : balance.formatted}
            />
            <WidthdrawModal
              setShowWithdrawModal={setShowWithdrawModal}
              showWidthdrawModal={showWidthdrawModal}

            />
          </>
          }
          {!address && <div className='shadow-2xl p-10 rounded-md w-full bg-white dark:bg-gray-800'>
            <h1 className='whitespace-nowrap text-2xl font-semibold dark:text-white italic'>Please sign in with your wallet to continue...</h1>



          </div>
          }
        </div>
      </div>

    </Flowbite>


  )
}

export default App
