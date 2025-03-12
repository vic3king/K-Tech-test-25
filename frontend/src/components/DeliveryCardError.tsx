import Button from "./Button"

const DeliveryCardError = ({ message }: { message?: string }) => {
  return (
    <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-[752px]">
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <div className="text-red-500">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-gray-600 text-center">{message}</p>
        <Button
          variant="primary"
          className="px-6 py-2.5"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}

export default DeliveryCardError