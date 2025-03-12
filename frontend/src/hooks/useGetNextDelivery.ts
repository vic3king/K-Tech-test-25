import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/axios";
import { DeliveryData } from "@/types/deliveryData";

export const GET_NEXT_DELIVERY_QUERY_KEY = "getNextDelivery";

const getNextDelivery = async (userId: string): Promise<DeliveryData> => {
  const res = await axiosClient.get<DeliveryData>(
    `/v1/comms/your-next-delivery/${userId}`
  );
  return res?.data;
};

export const useGetNextDelivery = (userId: string) => {
  return useQuery({
    queryKey: [GET_NEXT_DELIVERY_QUERY_KEY, userId],
    queryFn: () => getNextDelivery(userId),
    enabled: !!userId,
  });
};
