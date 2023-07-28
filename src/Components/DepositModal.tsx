'use client';

import { Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { parseEther } from 'viem';
import { useSignTypedData, useWaitForTransaction } from 'wagmi';
import { WriteContractResult } from 'wagmi/actions';
import { useMultiSigWalletGetBalance, useMultiSigWalletDeposit, usePrepareMultiSigWalletDeposit } from '../generated';
import ErrorHandler from './ErrorHandler'

interface Props {
  setShowDepositModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  showDepositModal: boolean | undefined;
}
const DepositModal = ({
  setShowDepositModal,
  showDepositModal,
}: Props) => {

  const amountInputRef = useRef<HTMLInputElement>(null)
  const [depositValueInt, setDepositValueInt] = useState<string>("0");
  const [showError, SetShowError] = useState<boolean>(false);
  const [errorMsg, SetErrorMsg] = useState<string>("");
  const { config: depositConfig } = usePrepareMultiSigWalletDeposit({ value: parseEther(depositValueInt) });
  const { data: returnDeposit, writeAsync: executeDeposit } = useMultiSigWalletDeposit(depositConfig);
  const { isLoading: depositLoading, isSuccess: depositSuccess } = useWaitForTransaction({ hash: returnDeposit?.hash });



  useEffect(() => {
    const clear = () => {
      if (depositSuccess) {
        setShowDepositModal(false);
        setDepositValueInt("0");
        console.log("return: ", returnDeposit)
      }
    }
    clear();
  }, [depositSuccess]);

  console.log("return: ", returnDeposit);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
    const value = parseEther(depositValueInt);
    console.log("value: ", value);
    if (value > 0) {
      console.log("deposit Config:", depositConfig);
      await executeDeposit?.();

    }
  }

  const handleCloseModal = () => {
    if (executeDeposit) {
      SetErrorMsg("Cannot close modal during transaction.");
      SetShowError(true);
    } else {
      setDepositValueInt("0");
      setShowDepositModal(false)
    }
  }
  return (
    <>
      <Modal
        show={showDepositModal}
        size="md"
        popup
        
        onClose={handleCloseModal}
        initialFocus={amountInputRef}

      >
        <Modal.Header > Deposit Eth </Modal.Header>
        <Modal.Body>
          <ErrorHandler
            showError={showError}
            errorMsg={errorMsg}
          />
          <div >
           
            {
              !depositLoading &&
              <form
                onSubmit={handleSubmit}
                className="m-2 bg-white shadow-xl rounded-lg py-10 px-5 mb-2"
              >
                <div className="mb-2">
                  <label
                    htmlFor="depositAmount"
                    className="block text-gray-700 font-bold"
                  >
                    Amount:
                  </label>
                  <div className="flex">
                    <input
                      id="depositAmount"
                      className="border-2 p-2  placeholder-gray-400 rounded-md w-3/4"
                      type="number"
                      placeholder="amount to deposit"
                      ref={amountInputRef}
                      value={depositValueInt}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setDepositValueInt(e.target.value) }}

                      min="0"
                      step="any"

                    />
                    <Button
                      color="warning"
                      className="ml-2 w-1/4 p-1">
                      Max</Button>
                  </div>
                </div>
                <Button
                  color="success"
                  className="w-full p-1"
                  onClick={handleSubmit}> Deposit</Button>
                <Button color="failure" className="w-full p-1 mt-2" onClick={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setDepositValueInt("0");
                  setShowDepositModal(false)
                }}> Cancel</Button>
                <p className="font-bold mt-1 text-center"> Max will 99.99% of Wallet balance to leave some eth for gas.</p>
              </form>
            }
            {depositLoading &&
              <div className='flex flex-col text-center '>
                <Spinner
                  aria-label="Transaction in progress"
                  size="xl"
                  className='my-2'
                />
                <p className="text-black dark:text-white">Transaction in progress, you can validate it on: </p>
                <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  href={`https://etherscan.io/tx/${returnDeposit?.hash}`}>Etherscan</a>
              </div>
            }
          </div>
        </Modal.Body>

      </Modal>
    </>
  )
}

export default DepositModal;