import React from 'react'

import { Button, Modal } from 'flowbite-react';
import {FiAlertCircle} from 'react-icons/fi';
import { formatEther } from 'viem';
import ErrorHandler from './ErrorHandler';
import { useEffect, useRef, useState } from 'react';
import {
    usePrepareMultiSigWalletApproveWithdrawTx,
    useMultiSigWalletApproveWithdrawTx
} from '../generated';
import { useWaitForTransaction } from 'wagmi';

interface Props  {
    id:number
    withdraw: IWithdraw;
    showSignModal: boolean;
    setShowSignModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignModal = ({id,withdraw,showSignModal,setShowSignModal}: Props) => {
  
    return (
    <Modal show={showSignModal} size="lg" popup onClose={()=>setShowSignModal(false)}>
        <Modal.Header />
        <Modal.Body>
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
              <Button color="failure">
                Yes, I'm sure
              </Button>
              <Button color="gray">
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
  )
}

export default SignModal