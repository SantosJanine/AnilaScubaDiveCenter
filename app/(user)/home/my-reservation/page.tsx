'use client';

import { useState, useEffect } from 'react';
import DiveReservationTable from './dive-reservation-table';
import EnrollmentReservationTable from './enrollment-reservation-table';
import RoomReservationTable from './room-reservation-table';
import { 
  useDiveReservation, 
  useEnrollmentReservation, 
  useRoomReservation 
} from './data';
import BlueLoading from '@/components/admin/blue-loading';

export default function MyReservationPage() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) setUserId(Number(storedUserId));
  }, []);

  const { data: diveData, isLoading: diveLoading, isError: diveError } = useDiveReservation(userId);
  const { data: enrollmentData, isLoading: enrollLoading, isError: enrollError } = useEnrollmentReservation(userId);
  const { data: roomData, isLoading: roomLoading, isError: roomError } = useRoomReservation(userId);

  if (diveLoading || enrollLoading || roomLoading) return <BlueLoading />;

  if (diveError || enrollError || roomError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="py-4 text-center text-red-500">Error loading reservations.</p>
        <button
          className="mt-4 rounded bg-logo-blue px-4 py-2 text-white"
          onClick={() => location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const diveCount = diveData.length;
  const enrollmentCount = enrollmentData.length;
  const roomCount = roomData.length;

  return (
    <div className="container mx-auto p-4 py-20 space-y-10">
      <div>
        <h2 className="mb-4">Dive Reservations ({diveCount})</h2>
        <DiveReservationTable data={diveData} />
      </div>

      <div>
        <h2 className="mb-4">Enrollment Reservations ({enrollmentCount})</h2>
        <EnrollmentReservationTable data={enrollmentData} />
      </div>

      <div>
        <h2 className="mb-4">Room Reservations ({roomCount})</h2>
        <RoomReservationTable />
      </div>
    </div>
  );
}
