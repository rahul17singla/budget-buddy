import './App.css';
import Graph from './components/Graph';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-8">
        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">Budget Buddy</h1>

        {/* grid columns */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* expense graph */}
          <Graph></Graph>
          {/* expense adding form */}
          <Form></Form>
        </div>
      </div>
    </div>
  );
}

export default App;
