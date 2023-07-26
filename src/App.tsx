/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import { useMultiSigWalletGetBalance, useMultiSigWalletDeposit, usePrepareMultiSigWalletDeposit } from './generated';
import Nav from "./Components/Nav";
import Withdraws from "./Components/Withdraws"
import Actions from "./Components/Actions";
import {
  useWalletClient,
  usePrepareContractWrite,
  useContractWrite,
  useBalance,
  useAccount,
  WalletClient,
  useWaitForTransaction
} from 'wagmi'
import { useEffect, useState } from "react";
import DepositModal from "./Components/DepositModal";
import WidthdrawModal from "./Components/WidthdrawModal";

function App() {
  const { address } = useAccount();
  const { data: contractBalance } = useMultiSigWalletGetBalance({watch:true});

  const [showDepositModal, setShowDepositModal] = useState<boolean | undefined>(false);
  const [showWidthdrawModal, setShowWithdrawModal] = useState<boolean | undefined>(false);
  const [depositValue, setDepositValue] = useState<bigint>(0n);

  const {
    config: depositConfig,
    error: prepareDepositError,
    isError: prepareDepositIsError } = usePrepareMultiSigWalletDeposit({value: depositValue});


  const { data: returnDeposit,write: executeDeposit } = useMultiSigWalletDeposit(depositConfig);
  const { isLoading: depositLoading, isSuccess: depositSuccess } = useWaitForTransaction({
    hash: returnDeposit?.hash,
  })
  
  const triggerDeposit = ()=>{
    console.log("triggerDeposit");
    executeDeposit?.();
  }
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
              prepareDepositError = {prepareDepositError}
              prepareDepositIsError = {prepareDepositIsError}
              returnDeposit = {returnDeposit}
              triggerDeposit = {triggerDeposit}
              setDepositValue ={setDepositValue}

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
