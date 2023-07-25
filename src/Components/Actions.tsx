'use client';

import { Button } from 'flowbite-react';

interface Props {
    setShowDepositModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    showDepositModal: boolean | undefined
}


const Actions = ({ setShowDepositModal, showDepositModal }: Props) => {
    return (
        <div className='flex mb-5 p-2 bg-white border-black-200 rounded shadow-2xl'>
            
                <Button color="success" className="mx-2 hover:scale-110" onClick={() => setShowDepositModal(true)}
                >
                    Deposit
                </Button>

            <Button color="warning" className="mx-2 hover:scale-110">
                Create Order
            </Button>
            <span className="ml-auto my-auto flex-row-reverse ">
                Total Balance in Wallet: <span className='font-bold'>1000 eth</span>
            </span>
        </div>
    )
}

export default Actions