import { useAccount, useConnectors } from '@starknet-react/core'
import { useMemo } from 'react'

function WalletConnected() {
  const { address } = useAccount()
  const { disconnect } = useConnectors()

  const shortenedAddress = useMemo(() => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }, [address])

  return (

   
        <div>
          <span>Connected: {shortenedAddress}</span>
          <button className=" bg-green-500 rounded-full" onClick={disconnect}>Disconnect</button>
        </div>
   
    
  )
}

function ConnectWallet() {
  const { connectors, connect } = useConnectors()

  return (
    <div>
      <span>Choose a wallet:</span>
      {connectors.map((connector) => {
        return (

          
          <button className="bg-green-500 rounded-full" key={connector.id} onClick={() => connect(connector)}>
            {connector.id}
          </button>
        )
      })}
    </div>
  )
}

export default function WalletBar() {
  const { address } = useAccount()
  const Component = address ? WalletConnected : ConnectWallet;
  return  <div className="grid grid-flow-col place-content-around text-white w-screen top-0 left-0 fixed bg-[#0b0d13] h-16 bg-cover">
            <div className="grid z-50 "><p className="text-2xl font-black">Pufu</p></div>
            <Component />
          </div>
}
