'use client';
import { Navbar, DarkThemeToggle } from 'flowbite-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';




const Nav = () => {
  return (
    <div className="shadow-2xl m-5 rounded-md">
      <Navbar
        fluid

        className='w-full rounded-md'>
        <Navbar.Brand>

          <span className="whitespace-nowrap text-xl font-semibold dark:text-white">
            MultiSig Wallet
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className='ml-auto flex-row-reverse'>
          <div className='flex'>
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
              <DarkThemeToggle className='ml-5'/>
          </div>

        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Nav