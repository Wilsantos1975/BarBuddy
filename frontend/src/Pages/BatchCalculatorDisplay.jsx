import BatchCalculator from "../Components/BatchCalculator";

function BatchCalculatorDisplay() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Batch Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BatchCalculator />
      </div>
    </div>
  );
}

export default BatchCalculatorDisplay;
