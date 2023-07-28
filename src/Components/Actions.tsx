'use client';

import { Button, Navbar } from 'flowbite-react';
import { formatEther } from 'viem';

interface Props {
    setShowDepositModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    showDepositModal: boolean | undefined;
    setShowWithdrawModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    showWidthdrawModal: boolean | undefined
    contractBalance: bigint | undefined
}


const Actions = ({ 
    setShowDepositModal,
    showDepositModal,
    setShowWithdrawModal,
    showWidthdrawModal,
    contractBalance }: Props) => {
    return (
        <Navbar className='flex mb-5 p-2 bg-white border-black-200 rounded-md shadow-2xl'>

            <Button
                color="success"
                className="mx-2 hover:scale-110"
                onClick={() => setShowDepositModal(true)}
            >
                Deposit
            </Button>

            <Button
                color="warning"
                className="mx-2 hover:scale-110"
                onClick={() => setShowWithdrawModal(true)}
            >
                Create Order
            </Button>
            {contractBalance?.toString() &&
                <span className="ml-auto my-auto flex-row-reverse dark:text-white">
                    Total Balance in Wallet: <span className='font-bold'>{formatEther(contractBalance).toString()} eth </span>
                </span>
            }

        </Navbar>
    )
}

export default Actions