interface ProgressStepProps {
  steps: Array<{
    number: number;
    title: string;
    isActive: boolean;
    isCompleted: boolean;
  }>;
  currentStep: number;
}

const ProgressIndicator = ({ steps, currentStep }: ProgressStepProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map(step => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step.isActive
                  ? 'bg-indigo-600 text-white'
                  : step.isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step.isCompleted ? '✓' : step.number}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                step.isActive
                  ? 'text-indigo-600'
                  : step.isCompleted
                    ? 'text-green-500'
                    : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
