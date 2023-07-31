'use client';

import { Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import {
    usePrepareMultiSigWalletCreateWithdrawTx,
    useMultiSigWalletCreateWithdrawTx
} from '../generated';
import { useWaitForTransaction } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import ErrorHandler from './ErrorHandler';

interface Props {
    setShowWithdrawModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    showWidthdrawModal: boolean | undefined
    contractBalance: bigint | undefined;
    address: `0x${string}`;
}

const WidthdrawModal = ({ setShowWithdrawModal, showWidthdrawModal, contractBalance, address }: Props) => {
    const [withdrawAmount, setWithdrawAmount] = useState<string>("0");
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | undefined>("");
    const [destinationAddress, setDestinationAddress] = useState<`0x${string}`>(address);

    const { config: withdrawConfig } = usePrepareMultiSigWalletCreateWithdrawTx(
        { args: [destinationAddress, parseEther(withdrawAmount)] });
    const { data, writeAsync, error, isError }
        = useMultiSigWalletCreateWithdrawTx(withdrawConfig);
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })
    const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/

    const clearAndClose = () => {
        setWithdrawAmount("0");
        setShowError(false);
        setErrorMsg("");
        setShowWithdrawModal(false);
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

    const handleUpdateAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const addr: string = e.target.value;
        if (ethereumAddressRegex.test(addr)) {
            setShowError(false);
            setErrorMsg("");
            setDestinationAddress(addr as `0x${string}`);
        } else {
            setShowError(true);
            setErrorMsg("Invalid address format, it should start with 0x and have 40 hex characters.");
        }
    }

    const amountInputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <Modal
                show={showWidthdrawModal}
                size="md"
                popup
                onClose={handleCloseModal}
                initialFocus={amountInputRef}

            >
                <Modal.Header ><span className='mx-2'>Widthdraw Order Creation</span></Modal.Header>
                <Modal.Body>
                    <div >
                        <ErrorHandler
                            showError={showError}
                            errorMsg={errorMsg}
                        />
                        {!isLoading &&
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
                                            value={withdrawAmount}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setWithdrawAmount(e.target.value) }}
                                            min="0"
                                            max={contractBalance ? (formatEther(contractBalance).toString()) : "0"}
                                            step="any"

                                        />
                                        <Button color="warning" className="ml-2 w-1/4 p-1"
                                            onClick={() => {
                                                setWithdrawAmount(
                                                    contractBalance ? (formatEther(contractBalance).toString()) : "0"
                                                )
                                            }}
                                        >
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
                                            onChange={handleUpdateAddress}
                                            value={destinationAddress}
                                        />
                                    </div>
                                </div>
                                <Button color="success" className="w-full p-1" onClick={handleSubmit}> Widthdraw</Button>
                                <Button color="failure" className="w-full p-1 mt-2" onClick={(e?: React.ChangeEvent<HTMLInputElement>) => handleCloseModal(e)}> Cancel</Button>
                            </form>}

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

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WidthdrawModal