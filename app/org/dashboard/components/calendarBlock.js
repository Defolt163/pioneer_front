'use client'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/componentsShadCN/ui/table";
import { useState } from "react";

export default function CalendarBlock(){
    const invoices = [
        {
            id: 0,
            dateTime: "10/01/2002 10:30",
            carModel: "Lada Vesta",
            serviceMethod: "Комплекс",
            duration: "60",
            price: 600
        },
        {
            id: 1,
            dateTime: "10/01/2002 10:30",
            carModel: "Lada Granta",
            serviceMethod: "Экспресс",
            duration: "30",
            price: 400
        },
        {
            id: 2,
            dateTime: "10/01/2002 10:30",
            carModel: "Suzuki Grand Vitara",
            serviceMethod: "Комплекс",
            duration: "60",
            price: 600
        },
        {
            id: 3,
            dateTime: "10/01/2002 10:30",
            carModel: "Мотоцикл",
            serviceMethod: "Экспресс",
            duration: "30",
            price: 400
        },
    ]
    return(
        <div className="calendar">
            <Table className={'overflow'}>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Дата</TableHead>
                        <TableHead>Автомобиль</TableHead>
                        <TableHead>Услуга</TableHead>
                        <TableHead className="text-right">Продолжительность</TableHead>
                        <TableHead className="text-right">Стоимость</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.dateTime}</TableCell>
                        <TableCell>{invoice.carModel}</TableCell>
                        <TableCell>{invoice.serviceMethod}</TableCell>
                        <TableCell className="text-right">{invoice.duration}мин</TableCell>
                        <TableCell className="text-right">{invoice.price}₽ </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Итого</TableCell>
                        <TableCell className="text-right">2500₽ </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}