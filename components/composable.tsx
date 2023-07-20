
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from 'react';
import { useAccount, useContractWrite } from "@starknet-react/core";
import { useMemo } from "react";
import { Abi, Call } from "starknet";

const Composable = () => {
  const [selectedProject, setSelectedProject] = useState('StarknetId');
  const [tokenId, setTokenId] = useState(0);
  const [recomposeInputs, setRecomposeInputs] = useState(['']);
  const [callData, setCallData] = useState<Call[]>([]);
  const [entryPoint, setEntryPoint] = useState('');

  //user account
  const { address } = useAccount()
  //pufu contract address goerlu
  const pufuContractAddress = '0x0070428f73215f95855b5df872ea731e692766a862588a94701d2f546342a882';

  //project list with nft address
  const projectList = [
    { name: 'StarknetId', address: '0x0783a9097b26eae0586373b2ce0ed3529ddc44069d1e0fbc4f66d42b69d6850d' },
    { name: 'Carbonable', address: '' },
    { name: '...', address: '' }
  ]

  const { write } = useContractWrite({ calls: callData });

  useEffect(() => {
    if (selectedProject && tokenId) {
      const currentAddress = projectList.filter(p => p.name == selectedProject).map(p => p.address);
      console.log("currentAddress :" + currentAddress);
      console.log("entryPoint :" + entryPoint);
      setCallData([
        {
          contractAddress: pufuContractAddress,
          entrypoint: entryPoint,
          calldata: [currentAddress[0], tokenId, 0]
        }
      ]);
    }
  }, [selectedProject, tokenId, entryPoint, address]);

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
    console.log("Decompose");
  }

  const handleTokenIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenId(Number(event.target.value));
  }

  const handleDecomposeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Insert your validation and blockchain logic here
    console.log(`Decomposed project: ${selectedProject}`);
    console.log(`TokenId: ${tokenId}`);
    console.log("CallData : " + callData[0]);
    write();
  }

  const handleRecomposeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    write();
    // Insert your validation and blockchain logic here
    console.log(`Recomposed project: ${recomposeInputs}`);
  }

  return (
    <div className="grid place-content-center justify-center items-center w-screen mt-16">
      <div className='p-8 w-96 bg-white rounded-xl shadow-md'>
        <Tabs>
          <TabsList>
            <TabsTrigger value="decompose" onClick={() => setEntryPoint('decompose')}>Decompose</TabsTrigger>
            <TabsTrigger value="recompose" onClick={() => setEntryPoint('compose')}>Recompose</TabsTrigger>
          </TabsList>

          <TabsContent value="decompose">
            <form onSubmit={handleDecomposeSubmit} className="space-y-4">
              <p>Select the asset to decompose</p>
              <select
                value={selectedProject}
                onChange={handleProjectChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {projectList.map((project, index) =>
                  <option key={index} value={project.name}>{project.name}</option>
                )}
              </select>
              <input
                type="number"
                value={tokenId}
                onChange={handleTokenIdChange}
                placeholder="Enter tokenId"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Decompose
              </button>
            </form>
          </TabsContent>

          <TabsContent value="recompose">
            <form onSubmit={handleRecomposeSubmit} className="space-y-4">
              <p>Select the components to recompose</p>
              <select
                value={selectedProject}
                onChange={handleProjectChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {projectList.map((project, index) =>
                  <option key={index} value={project.name}>{project.name}</option>
                )}
              </select>

              <input
                type="number"
                value={tokenId}
                onChange={handleTokenIdChange}
                placeholder="Enter tokenId"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 mt-4"
              >
                Recompose
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Composable;
