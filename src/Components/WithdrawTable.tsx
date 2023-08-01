import { Badge, Button, Table } from 'flowbite-react'
import { useState } from 'react';
import { formatEther } from 'viem';
import SignModal from './SignModal';

interface Props {
    index: number;
    withdraw: IWithdraw;
}

const WithdrawTable = ({ index, withdraw }: Props) => {
    const [showSignModal, setShowSignModal] = useState<boolean>(false);
    return (

        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index}
            </Table.Cell>
            <Table.Cell>
                {withdraw?.to}
            </Table.Cell>
            <Table.Cell>
                {formatEther(withdraw.amount).toString()} eth
            </Table.Cell>
            <Table.Cell>
                {withdraw.approvals.toString()}
            </Table.Cell>

            <Table.Cell>
                <Badge color={withdraw.sent === true ? "success" : "warning"}>
                    {withdraw?.sent.toString()}
                </Badge>
            </Table.Cell>
            <Table.Cell>
                <Button
                className="hover:scale-110"
                disabled={withdraw?.sent}
                onClick={()=>setShowSignModal(true)}>
                    Sign
                </Button>
            </Table.Cell>
            <SignModal
                id={index}
                withdraw={withdraw}
                showSignModal={showSignModal}
                setShowSignModal={setShowSignModal}
            />
        </Table.Row>
    )
}

export default WithdrawTable