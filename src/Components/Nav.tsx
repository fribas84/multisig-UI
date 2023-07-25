'use client';
import { Navbar } from 'flowbite-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';




const Nav = () => {
  return (
    <div className="shadow-2xl m-5">
      <Navbar
        fluid
        rounded
        className='w-full'>
        <Navbar.Brand>

          <span className="whitespace-nowrap text-xl font-semibold dark:text-white">
            MultiSig Wallet
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className='ml-auto flex-row-reverse'>
          <div>
            <ConnectButton label="Connect your wallet"
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
              chainStatus="icon"
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }} />
          </div>

        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Nav