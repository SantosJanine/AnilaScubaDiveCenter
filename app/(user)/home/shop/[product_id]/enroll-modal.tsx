'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { toast } from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import BlueLoading from '@/components/admin/blue-loading';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Batch {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  product_id: number;
}

export default function EnrollModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [batch_id, setBatch_id] = useState<number>(0);
  const [enrolledStudents, setEnrolledStudents] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [userEnrolled, setUserEnrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const course_id = Number(pathname?.split('/').pop());
  const userId = typeof window !== 'undefined' ? Number(localStorage.getItem('id')) : 0;

  // Fetch batches
  const { data, error } = useSWR(
    course_id ? `/api/batch/enroll/get-course-schedule?id=${course_id}` : null,
    fetcher
  );

  // Check enrolled students for a batch
  const checkEnrollmentStatus = async (batchId: number) => {
    try {
      const res = await fetch(`/api/batch/student?id=${batchId}`);
      const result = await res.json();
      const enrolledIds = result.students.map((s: any) => s.user_id);
      setEnrolledStudents(enrolledIds);
      setUserEnrolled(enrolledIds.includes(userId));
    } catch {
      toast.error('Failed to load enrollment status.');
    }
  };

  const handleOpen = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push("/account/sign-in-required");
      return;
    }

    setLoading(true);
    setUserEnrolled(false);
    setBatch_id(0);

    if (data?.batch?.length > 0) {
      await checkEnrollmentStatus(data.batch[0].id);
    }

    setLoading(false);
    onOpen();
  };

  const handleSubmit = async () => {
    if (batch_id === 0) {
      toast.error('Please select a schedule.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/batch/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, batch_id }),
      });

      if (!res.ok) throw new Error('Enrollment failed');

      toast.success('You have successfully enrolled!');
      onOpenChange();
    } catch {
      toast.error('Enrollment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button color="primary" onPress={handleOpen}>Enroll</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Please select an available schedule</ModalHeader>
              <ModalBody>
                {error && <p className="text-red-500">Failed to load schedules.</p>}

                {loading ? (
                  <BlueLoading />
                ) : (
                  data?.batch?.length > 0 ? (
                    <Select
                      label="Select schedule"
                      labelPlacement="outside"
                      placeholder="Select schedule"
                      variant="underlined"
                      value={batch_id}
                      onChange={(e) => setBatch_id(Number(e.target.value))}
                      isRequired
                    >
                      {data.batch.map((batch: Batch) => (
                        <SelectItem
                          key={batch.id}
                          value={batch.id}
                          isDisabled={userEnrolled || enrolledStudents.includes(userId)}
                        >
                          {`${batch.name} | ${new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(batch.start_date))} - ${new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(batch.end_date))}`}
                        </SelectItem>
                      ))}
                    </Select>
                  ) : (
                    <p className="text-gray-500">No available schedule.</p>
                  )
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>Close</Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isDisabled={isSubmitting || userEnrolled || batch_id === 0 || !data?.batch?.length}
                >
                  {isSubmitting ? <Spinner size="sm" color="current" /> : "Submit"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
