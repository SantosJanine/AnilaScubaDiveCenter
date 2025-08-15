'use client';

import React from 'react';
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react';

interface EnrollmentReservationTableProps {
  data: Array<{
    batch_id: number;
    batch_name: string;
    product_name: string;
    start_date: string;
    end_date: string;
    price: number;
  }>;
}

const EnrollmentReservationTable: React.FC<EnrollmentReservationTableProps> = ({ data }) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  const renderTable = (data: any[]) => (
    <Table aria-label="Enrollments table" className="hidden md:table w-full pt-1">
      <TableHeader>
        <TableColumn className="text-center">ID</TableColumn>
        <TableColumn className="text-left">CLASS</TableColumn>
        <TableColumn className="text-left">INFO</TableColumn>
        <TableColumn className="text-left">DURATION</TableColumn>
        <TableColumn className="text-left">PRICE</TableColumn>
      </TableHeader>
      <TableBody emptyContent="No enrollments found.">
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">{item.batch_id}</TableCell>
            <TableCell className="text-left">{item.batch_name}</TableCell>
            <TableCell className="text-left">{item.product_name}</TableCell>
            <TableCell className="text-left">
              {formatDate(item.start_date)} - {formatDate(item.end_date)}
            </TableCell>
            <TableCell className="text-left">₱{Number(item.price).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderCards = (data: any[]) => (
    <div className="flex flex-col space-y-4 md:hidden">
      {data.map((item, index) => (
        <Card key={index} className="p-4">
          <CardBody>
            <p><strong>ID:</strong> {item.batch_id}</p>
            <p><strong>Class:</strong> {item.batch_name}</p>
            <p><strong>Info:</strong> {item.product_name}</p>
            <p><strong>Duration:</strong> {formatDate(item.start_date)} - {formatDate(item.end_date)}</p>
            <p><strong>Price:</strong> ₱{Number(item.price).toFixed(2)}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      {data.length > 0 ? (
        <>
          {renderTable(data)}
          {renderCards(data)}
        </>
      ) : (
        <p className="py-4 text-center">No enrollments found.</p>
      )}
    </div>
  );
};

export default EnrollmentReservationTable;
