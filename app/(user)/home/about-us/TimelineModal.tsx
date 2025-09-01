"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  title: string;
  description: string;
  moreInfo?: string;
}

export default function TimelineModal({
  isOpen,
  onClose,
  year,
  title,
  description,
  moreInfo,
}: TimelineModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {year} – {title}
          </ModalHeader>
          <ModalBody>
            <p>{description}</p>
            {moreInfo && (
              <p className="text-gray-600 text-sm mt-2">{moreInfo}</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
