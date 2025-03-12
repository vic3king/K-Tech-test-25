import React from 'react'
import Button from './Button'

interface CatData {
  name: string
  subscriptionActive: boolean
  breed: string
  pouchSize: string
}

interface ModalProps {
  deliveryData: {
    title: string
    message: string
    totalPrice: number
    freeGift: boolean
    cats: CatData[]
  }
  onClose: () => void
}

const Modal = ({ deliveryData, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded shadow-xl w-[1000px] max-h-[90vh] flex flex-col">
        <div className="mb-6 relative">
          <h2 className="text-green-600 font-bold text-3xl mb-3">
            {deliveryData.title}
          </h2>
          {deliveryData.freeGift && (
            <div className="absolute -top-8 -right-12 z-10">
              <span className="bg-pink-200 text-pink-800 text-base font-medium px-4 py-2 rounded inline-block transform rotate-12 shadow-md">
                FREE GIFT
              </span>
            </div>
          )}
          <p className="text-gray-600 text-lg">{deliveryData.message}</p>
        </div>

        <div className="flex-grow overflow-y-auto pr-4 mb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveryData.cats.map((cat, index) => (
              <div
                key={`${cat.name}-${index}`}
                className="bg-gray-50 rounded p-5 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-xl mb-3 text-green-700">{cat.name}</h3>
                <img
                  src={`https://cataas.com/cat?${cat.name}`}
                  alt={`Cat ${cat.name}`}
                  className="w-full h-44 object-cover rounded mb-4 shadow-sm"
                />
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="font-medium">Breed: <span className="text-gray-700">{cat.breed}</span></p>
                  <p className="font-medium">Pouch Size: <span className="text-gray-700">{cat.pouchSize}</span></p>
                  {cat.subscriptionActive && (
                    <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded mt-2">
                      ✓ Active Subscription
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-auto bg-white">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-gray-600 text-lg">Total:</span>
                <span className="font-bold text-xl text-green-600">
                  £{deliveryData.totalPrice.toFixed(2)}
                </span>
              </div>

            </div>
            <Button onClick={onClose} variant="primary" className="px-8 py-3 text-lg">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
