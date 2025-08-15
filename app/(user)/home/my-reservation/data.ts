import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useDiveReservation = (user_id: number | null) => {
  const { data, error } = useSWR(
    user_id ? `/api/bookings/${user_id}` : null,
    fetcher
  );

  return {
    data: data?.data || [],
    isLoading: !error && !data,
    isError: !!error,
  };
};

export const useEnrollmentReservation = (user_id: number | null) => {
  const { data, error } = useSWR(
    user_id ? `/api/enrollment/${user_id}` : null,
    fetcher
  );

  return {
    data: data?.data || [],
    isLoading: !error && !data,
    isError: !!error,
  };
};

// ---------------------------
// New hook for room reservations
export const useRoomReservation = (user_id: number | null) => {
  const { data, error } = useSWR(
    user_id ? `/api/room-reservation/${user_id}` : null,
    fetcher
  );

  return {
    data: data?.data || [],
    isLoading: !error && !data,
    isError: !!error,
  };
};
