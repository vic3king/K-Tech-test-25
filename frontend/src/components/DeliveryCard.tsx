// components/DeliveryCard.tsx
import Image from 'next/image'
import { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import { DeliveryData } from '@/types/deliveryData'

const DeliveryCard = ({ deliveryData }: { deliveryData: DeliveryData }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="bg-white rounded shadow-lg p-6 py-8 relative w-full max-w-[752px] hover:shadow-xl transition-shadow duration-300">
      <div className="mt-14 md:mt-0 md:grid md:grid-cols-2 md:gap-6">
        {/* Mobile circular image */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 md:hidden">
          <div className="relative w-24 h-24">
            <Image
              src="/cat.jpg"
              alt="Cat Icon"
              fill
              sizes="96px"
              priority
              className="rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
        </div>

        {/* Desktop square image */}
        <div className="hidden md:block">
          <div className="relative w-full aspect-square">
            <Image
              src={`https://cataas.com/cat?name`}
              alt={`Cat `}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="rounded object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="text-center md:text-left space-y-4">
            <div className="space-y-2">
              <h2 className="text-[#0D8112] font-bold text-xl tracking-tight">
                {deliveryData.title}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                {deliveryData.message}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Total price</p>
              <p className="font-semibold text-2xl text-gray-900">
                £{deliveryData.totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="flex gap-3 justify-between">
              <Button
                onClick={() => setShowModal(true)}
                variant="primary"
                className="w-1/2 px-6 py-2.5"
              >
                See Details
              </Button>
              <Button
                variant="outline"
                className="w-1/2 px-6 py-2.5"
              >
                Edit Delivery
              </Button>
            </div>
          </div>
        </div>
      </div>

      {deliveryData.freeGift && (
        <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 -bottom-4 md:left-auto md:-top-2 md:-right-3 z-10">
          <span className="bg-[#FFB8EF] text-[#773E75] text-sm px-3 py-1.5 inline-block transform md:rotate-12 -rotate-5 border border-[#E7AADA] font-bold">
            FREE GIFT
          </span>
        </div>
      )}

      {showModal && (
        <Modal
          deliveryData={deliveryData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default DeliveryCard