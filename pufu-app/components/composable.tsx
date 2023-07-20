
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react';

const Composable = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [recomposeInputs, setRecomposeInputs] = useState(['']);

  const projectList = ['Project 1', 'Project 2', 'Project 3']; // Insert your project names

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  }

  const handleDecomposeSubmit = (event) => {
    event.preventDefault();

    // Insert your validation and blockchain logic here
    console.log(`Decomposed project: ${selectedProject}`);
    console.log(`Quantity: ${quantity}`);
  }

  const handleAddRecomposeInput = () => {
    setRecomposeInputs([...recomposeInputs, '']); // add a new empty input field to the list
  }

  const handleRecomposeChange = (index) => (event) => {
    const newRecomposeInputs = [...recomposeInputs]; // copy the current state
    newRecomposeInputs[index] = event.target.value; // update the specific input field
    setRecomposeInputs(newRecomposeInputs); // set the new state
  }

  const handleRecomposeSubmit = (event) => {
    event.preventDefault();

    // Insert your validation and blockchain logic here
    console.log(`Recomposed project: ${recomposeInputs}`);
  }

  return (
    <div className="grid place-content-center justify-center items-center w-screen mt-16">
      <div className='p-8 w-96 bg-white rounded-xl shadow-md'>
        <Tabs>
          <TabsList>
            <TabsTrigger value={"decompose"}>Decompose</TabsTrigger>
            <TabsTrigger value="recompose" >Recompose</TabsTrigger>
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
                  <option key={index} value={project}>{project}</option>
                )}
              </select>
              <input 
                type="number" 
                value={quantity} 
                onChange={handleQuantityChange} 
                placeholder="Enter quantity" 
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
              {recomposeInputs.map((input, index) => (
                <select 
                  key={index}
                  value={input} 
                  onChange={handleRecomposeChange(index)} 
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {projectList.map((project, index) => 
                    <option key={index} value={project}>{project}</option>
                  )}
                </select>
              ))}
              <button 
                type="button"
                onClick={handleAddRecomposeInput}
                className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-700"
              >
                Add Component
              </button>
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
