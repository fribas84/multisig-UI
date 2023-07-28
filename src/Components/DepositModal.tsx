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
  balance: string;
}
const DepositModal = ({
  setShowDepositModal,
  showDepositModal,
  balance
}: Props) => {

  const amountInputRef = useRef<HTMLInputElement>(null)
  const [depositValueInt, setDepositValueInt] = useState<string>("0");
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");
  const { config: depositConfig } = usePrepareMultiSigWalletDeposit({ value: parseEther(depositValueInt) });
  const { data: returnDeposit, writeAsync: executeDeposit, error, isError } = useMultiSigWalletDeposit(depositConfig);
  const { isLoading: depositLoading, isSuccess: depositSuccess } = useWaitForTransaction({ hash: returnDeposit?.hash });



  useEffect(() => {
    const clear = () => {
      if (depositSuccess) {
        setDepositValueInt("0");
        setShowError(false);
        setShowDepositModal(false);

      }
    }
    clear();
  }, [depositSuccess]);


  useEffect(() => {
    const errorTx = () => {
      if (isError) {
        setShowError(true);
        setErrorMsg(error?.message);
      }
    }
    errorTx();
  }, [isError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = parseEther(depositValueInt);
    if ((value > 0) && parseInt(balance)<value) {
      try {
        setShowError(false);
        await executeDeposit?.();

      }
      catch (e) {
        setShowError(true);
        if (typeof e === "string") {
          setErrorMsg(e);
        } else if (e instanceof Error) {
          setErrorMsg(e.message);
        }
      }

    } else {
      setShowError(true);
      setErrorMsg("Invalid deposit value");
    }
  }

  const handleCloseModal = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (executeDeposit?.length && !isError) {
      setErrorMsg("Cannot close modal during transaction.");
      setShowError(true);
    } else {
      setDepositValueInt("0");
      setShowError(false);
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
                      max = {balance}
                      min="0"
                      step="any"

                    />
                    <Button
                      color="warning"
                      className="ml-2 w-1/4 p-1"
                      onClick={()=>{
                        const val = parseFloat(balance) * 0.99;
                        setDepositValueInt(val.toString());
                      }}>
                      Max</Button>
                  </div>
                </div>
                <p className="font-bold mt-1 text-center"> Max will leave 1% of account balance for gas.</p>
                <Button
                  color="success"
                  className="w-full p-1 mt-3"
                  onClick={handleSubmit}> Deposit</Button>
                <Button color="failure" className="w-full p-1 mt-2" onClick={handleCloseModal}> Cancel</Button>
               
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