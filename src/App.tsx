/* eslint-disable @typescript-eslint/no-unsafe-call */
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

function App() {
  const { address } = useAccount();

  const [showDepositModal,setShowDepositModal] = useState<boolean|undefined>(false);
  return (
    <div className='container mx-auto my-5'>
      <Nav />
  
      <div className="m-5">
      {address && <>
        <Actions 
        setShowDepositModal={setShowDepositModal}
        showDepositModal={showDepositModal}/>
        <Withdraws />
        <DepositModal 
        setShowDepositModal={setShowDepositModal}
        showDepositModal={showDepositModal}/>
        </>
      }
      </div>
      </div>
 

    

  )
}

export default App
