import React from 'react'

import { Button, Modal, Spinner } from 'flowbite-react';
import { FiAlertCircle } from 'react-icons/fi';
import { formatEther } from 'viem';
import ErrorHandler from './ErrorHandler';
import { useEffect, useState } from 'react';
import {
  usePrepareMultiSigWalletApproveWithdrawTx,
  useMultiSigWalletApproveWithdrawTx
} from '../generated';
import { useWaitForTransaction } from 'wagmi';

interface Props {
  id: number
  withdraw: IWithdraw;
  showSignModal: boolean;
  setShowSignModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// const { config: withdrawConfig } = usePrepareMultiSigWalletCreateWithdrawTx(
//   { args: [destinationAddress, parseEther(withdrawAmount)] });
// const { data, writeAsync, error, isError }
//   = useMultiSigWalletCreateWithdrawTx(withdrawConfig);
// const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })


const SignModal = ({ id, withdraw, showSignModal, setShowSignModal }: Props) => {
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");

  const { config } = usePrepareMultiSigWalletApproveWithdrawTx({
    args: [BigInt(id)]
  });
  const { data, writeAsync, error, isError } = useMultiSigWalletApproveWithdrawTx(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  const clearAndClose = () => {
    setShowError(false);
    setShowSignModal(false);
  }

  useEffect(() => {
    if (isSuccess) {
      clearAndClose();
    }
  }, [isSuccess])


  useEffect(() => {
    const errorTx = () => {
      if (isError) {
        setShowError(true);
        setErrorMsg(error?.message);
      }
    }
    errorTx();
  }, [isError])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setShowError(false);
      await writeAsync?.();
    }
    catch (e) {
      setShowError(true);
      if (typeof e === "string") {
        setErrorMsg(e);
      } else if (e instanceof Error) {
        setErrorMsg(e.message);
      }
    }
  }

  const handleCloseModal = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (writeAsync?.length && !isError) {
      setErrorMsg("Cannot close modal during transaction.");
      setShowError(true);
    } else {
      clearAndClose();
    }
  }

  return (
    <Modal show={showSignModal} size="lg" popup onClose={handleCloseModal}>
      <Modal.Header />
      <Modal.Body>
        <ErrorHandler
          showError={showError}
          errorMsg={errorMsg}
        />
        {!isLoading &&
          <div className="text-center">
            <FiAlertCircle className="mx-auto mb-4 h-14 w-14 text-yellow-200 dark:text-yellow-100" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-100">
              Do you want to Sign Withdraw ID {id}?
            </h3>
            <div className='text-black dark:text-white text-left m-auto'>
              <p>Amount: {formatEther(withdraw.amount).toString()} eth</p>
              <p>Destination: {withdraw.to}</p>
              <p>Signers: {withdraw.approvals.toString()}</p>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Button color="failure"
                onClick={handleSubmit}
              >
                Yes, sign
              </Button>
              <Button color="gray"
                onClick={handleCloseModal}>
                No, cancel
              </Button>
            </div>
          </div>
        }
        {isLoading &&
          <div className='flex flex-col text-center '>
            <Spinner
              aria-label="Withdraw in progress..."
              size="xl"
              className='my-2'
            />
            <p className="text-black dark:text-white">Transaction in progress, you can validate it on: </p>
            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        }
      </Modal.Body>
    </Modal>
  )
}

export default SignModal