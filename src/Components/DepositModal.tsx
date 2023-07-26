'use client';

import { Button, Modal } from 'flowbite-react';
import { useRef, useState } from 'react';
import { parseEther } from 'viem';
import { useSignTypedData } from 'wagmi';
import { WriteContractResult } from 'wagmi/actions';

interface Props {
  setShowDepositModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  showDepositModal: boolean | undefined;
  prepareDepositError: Error | null;
  prepareDepositIsError: boolean;
  returnDeposit: WriteContractResult | undefined;
  triggerDeposit: () => void;
  setDepositValue: React.Dispatch<React.SetStateAction<bigint>>

}
const DepositModal = ({
  setShowDepositModal,
  showDepositModal,
  triggerDeposit,
  setDepositValue }: Props) => {
  const amountInputRef = useRef<HTMLInputElement>(null)
  const [depositValueInt, setDepositValueInt] = useState<string>("0");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
    const value = parseInt(depositValueInt);
    if (value > 0) {
      setDepositValue(parseEther(depositValueInt));
      triggerDeposit();
    }
    
  }
  return (
    <>
      <Modal
        show={showDepositModal}
        size="md"
        popup
        onClose={() => {
          setDepositValueInt("0");
          setShowDepositModal(false)
        }}
        initialFocus={amountInputRef}
        dismissible
      >
        <Modal.Header />
        <Modal.Body>
          <div >
            <h2 className="font-black text-3xl text-center mb-1">
              Deposit Eth
            </h2>

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

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}



export default DepositModal;