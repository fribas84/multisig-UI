'use client';

import { Table, Badge, Button } from 'flowbite-react';
import { useMultiSigWalletGetWithdrawRequest } from '../generated';

const Withdraws = () => {

  const { data } = useMultiSigWalletGetWithdrawRequest();
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
                Requester
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
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  1
                </Table.Cell>
                <Table.Cell>
                  0x1234
                </Table.Cell>
                <Table.Cell>
                  0x1234
                </Table.Cell>
                <Table.Cell>
                  1234 eth
                </Table.Cell>
                <Table.Cell>
                  0x1234, 0x1235
                </Table.Cell>
                <Table.Cell>
                  <Badge color="success">
                    Sent
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button color="failure" className="hover:scale-110" disabled>
                    Sign
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  2
                </Table.Cell>
                <Table.Cell>
                  0x1234
                </Table.Cell>
                <Table.Cell>
                  0x1234
                </Table.Cell>
                <Table.Cell>
                  10 eth
                </Table.Cell>
                <Table.Cell>
                  0x1234, 0x1235
                </Table.Cell>
                <Table.Cell>
                  <Badge color="info">
                    In Progress
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button color="failure" className="hover:scale-110">
                    Sign
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        }
      </>
    )
  }
}

export default Withdraws