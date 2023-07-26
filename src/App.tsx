/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DarkThemeToggle, Flowbite } from 'flowbite-react';

import Nav from "./Components/Nav";
import Withdraws from "./Components/Withdraws"
import Actions from "./Components/Actions";
import {
  useWalletClient,
  usePrepareContractWrite,
  useContractWrite,
  useBalance,
  useAccount,
  WalletClient
} from 'wagmi'
import { useEffect, useState } from "react";
import DepositModal from "./Components/DepositModal";
import WidthdrawModal from "./Components/WidthdrawModal";

function App() {
  const { address } = useAccount();

  const [showDepositModal, setShowDepositModal] = useState<boolean | undefined>(false);
  const [showWidthdrawModal, setShowWithdrawModal] = useState<boolean | undefined>(false);
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
            showWidthdrawModal={showWidthdrawModal} />
          <Withdraws />
          <DepositModal
            setShowDepositModal={setShowDepositModal}
            showDepositModal={showDepositModal} />
          <WidthdrawModal
            setShowWithdrawModal={setShowWithdrawModal}
            showWidthdrawModal={showWidthdrawModal}

          />
        </>
        }
      </div>
    </div>

    </Flowbite>


  )
}

export default App
