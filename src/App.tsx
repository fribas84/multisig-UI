import Nav from "./Components/Nav";
import {
  useWalletClient,
  usePrepareContractWrite,
  useContractWrite,
  useBalance,
  useAccount
} from 'wagmi'

function App() {
  const { data: walletClient } = useWalletClient({});
  console.log(walletClient)
  return (
    <div className='container mx-auto'>
      <Nav />
      {walletClient && <div className='m-5 bg-white border-black-200 rounded shadow-2xl'>
        <p>Hello {walletClient?.account.address}</p>
      </div>}


    </div>

  )
}

export default App
