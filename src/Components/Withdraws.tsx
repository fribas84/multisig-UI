'use client';

import { Table, Badge, Button } from 'flowbite-react';
import { useMultiSigWalletGetWithdrawRequest } from '../generated';
import { formatEther } from 'viem';

interface IWithdraw {
  to: `0x${string}`,
  amount: bigint,
  approvals: bigint,
  sent: boolean
}

const Withdraws = () => {

  const { data } = useMultiSigWalletGetWithdrawRequest({watch:true});
  if (data != undefined) {
    return (
      <>
        {data?.length == 0 && <div className='whitespace-nowrap text-xl font-semibold dark:text-white italic m-5'> No Widthdraw requests</div>}
        {data?.length > 0 &&
          <Table hoverable className='shadow-2xl' >
            <Table.Head>
              <Table.HeadCell>
                Widthdraw Id
              </Table.HeadCell>

              <Table.HeadCell>
                Destination
              </Table.HeadCell>
              <Table.HeadCell>
                Amount
              </Table.HeadCell>
              <Table.HeadCell>
                Signers
              </Table.HeadCell>
              <Table.HeadCell>
                Status
              </Table.HeadCell>

              <Table.HeadCell>

                Actions

              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {
                data.map((withdraw: IWithdraw, index) => {
                  return (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                        <Badge color="success">
                          {withdraw?.sent.toString()}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Button color="failure" className="hover:scale-110" disabled>
                          Sign
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  )
                })
              }
            </Table.Body>
          </Table>
        }
      </>
    )
  }
}

export default Withdraws