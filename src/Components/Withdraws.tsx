'use client';

import { Table } from 'flowbite-react';
import { useMultiSigWalletGetWithdrawRequest } from '../generated';
import WithdrawTable from './WithdrawTable';



const Withdraws = () => {

  const { data } = useMultiSigWalletGetWithdrawRequest({ watch: true });
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
                Completed
              </Table.HeadCell>
              <Table.HeadCell>
                Actions
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {
                data.map((withdraw: IWithdraw, index) => (
                  <WithdrawTable
                  key={index}
                    index={index}
                    withdraw={withdraw} />
                ))
              }
            </Table.Body>
          </Table>
        }
      </>
    )
  }
}

export default Withdraws