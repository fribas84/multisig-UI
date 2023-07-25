'use client';

import { Button, Modal } from 'flowbite-react';
import { useRef } from 'react';

interface Props {
    setShowWithdrawModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    showWidthdrawModal: boolean | undefined
}

const WidthdrawModal = ({ setShowWithdrawModal, showWidthdrawModal }: Props) => {
    const amountInputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = () => {
        console.log("handleSubmit")
    }

    return (
        <>
            <Modal
                show={showWidthdrawModal}
                size="md"
                popup
                onClose={() => setShowWithdrawModal(false)}
                initialFocus={amountInputRef}
                dismissible
            >
                <Modal.Header />
                <Modal.Body>
                    <div >
                        <h2 className="font-black text-3xl text-center mb-1">
                            Widthdraw Eth
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="m-2 bg-white shadow-xl rounded-lg py-10 px-5 mb-2"
                        >
                            <div className="mb-2">
                                <label
                                    htmlFor="withdrawAmount"
                                    className="block text-gray-700 font-bold"
                                >
                                    Amount to Withdraw:
                                </label>
                                <div className="flex">
                                    <input
                                        id="withdrawAmount"
                                        className="border-2 p-2  placeholder-gray-400 rounded-md w-3/4"
                                        type="number"
                                        placeholder="Amount to widthdraw"
                                        ref={amountInputRef}

                                        min="0"
                                        step="any"

                                    />
                                    <Button color="warning" className="ml-2 w-1/4 p-1">
                                        Max</Button>

                                </div>
                            </div>

                            <div className="mb-2">
                                <label
                                    htmlFor="destination"
                                    className="block text-gray-700 font-bold"
                                >
                                    Destination to Address:
                                </label>
                                <div className="flex">
                                    <input
                                        id="destination"
                                        className="border-2 p-2  placeholder-gray-400 rounded-md w-full"
                                        type="text"
                                        placeholder="Destination address"
                                    />
                                </div>
                            </div>
                            <Button color="success" className="w-full p-1"> Widthdraw</Button>
                            <Button color="failure" className="w-full p-1 mt-2" onClick={() => setShowWithdrawModal(false)}> Cancel</Button>

                        </form>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WidthdrawModal