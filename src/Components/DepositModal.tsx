'use client';

import { Button, Checkbox, Label, Modal, TextInput, NumberInput } from 'flowbite-react';
import { useRef } from 'react';

interface Props {
  setShowDepositModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  showDepositModal: boolean | undefined
}
const DepositModal = ({ setShowDepositModal, showDepositModal }: Props) => {
  const emailInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    console.log("handleSubmit")
  }
  return (
    <>
      <Modal
        show={showDepositModal}
        size="md"
        popup
        onClose={() => setShowDepositModal(false)}
        initialFocus={emailInputRef}
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

                    min="0"
                    step="any"

                  />
                  <Button color="warning" className="ml-2 w-1/4 p-1">
                    Max</Button>
                </div>
              </div>
              <Button color="success" className="w-full p-1"> Deposit</Button>
              {/* <input
                type="submit"
                className="bg-teal-500 w-full p-3 text-white font-bold hover:bg-teal-700 cursor-pointer transition-all rounded-md"
                value="Deposit"
              /> */}
              {/* <button
                className="bg-red-500 w-full p-3 text-white  font-bold hover:bg-red-700 cursor-pointer transition-all rounded-md mt-3"
                onClick={(e) => {
                  e.preventDefault();

                }}
              >Cancel
              </button> */}
              <Button color="failure" className="w-full p-1 mt-2" onClick={() => setShowDepositModal(false)}> Cancel</Button>
              <p className="font-bold mt-1 text-center"> Max will 99.99% of Wallet balance to leave some eth for gas.</p>
            </form>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}



export default DepositModal;