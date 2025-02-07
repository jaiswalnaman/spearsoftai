import { STEPS } from '../constants/steps';

interface StepIndicatorProps {
  steps: typeof STEPS;
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? 'neon-border neon-text'
                  : 'border-gray-600 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-full mx-4 ${
                  index < currentStep
                    ? 'bg-current neon-border'
                    : 'bg-gray-600'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <span
            key={step}
            className={`text-sm ${
              index <= currentStep ? 'neon-text' : 'text-gray-600'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}