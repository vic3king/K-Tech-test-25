import { useRouter } from 'next/router'
import DeliveryCardSkeleton from '@/components/DeliveryCardSkeleton'
import DeliveryCardError from '@/components/DeliveryCardError'
import DeliveryCard from '@/components/DeliveryCard'
import { useGetNextDelivery } from '@/hooks/useGetNextDelivery'
import { AxiosError } from 'axios'

export default function WelcomePage() {
  const router = useRouter()
  const { userId } = router.query

  const { data: deliveryData, isError, isLoading, error } = useGetNextDelivery(
    typeof userId === 'string' ? userId : ''
  )

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {isLoading ? (
        <DeliveryCardSkeleton />
      ) : isError ? (
        <DeliveryCardError message={(error as AxiosError<{ message: string }>)?.response?.data?.message || 'An error occurred'} />
      ) : deliveryData ? (
        <DeliveryCard deliveryData={deliveryData} />
      ) : null}
    </div>
  )
}
