'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/componentsShadCN/ui/alert-dialog";
import { Button } from "@/componentsShadCN/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/componentsShadCN/ui/dropdown-menu";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/componentsShadCN/ui/table";
import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CalendarBlock(){
    const [open, setOpen] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [currentInvoice, setCurrentInvoice] = useState(null)
    const [invoices, setInvoices] = useState([])
    async function getServices(){
        let access_token
        access_token = localStorage.getItem("pioneer_token")
        const response = await fetch(`http://localhost:8000/api/bookings/calendar/`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`,
            }
        })
        if(response.ok){
            console.log("OK",response)
            const data = await response.json()
            console.log(data)
            setInvoices(data.results)
        }else if(!response.ok){
            console.error("NOT OK",response)
        }
    }
    useEffect(()=>{
        getServices()
    }, [])

    async function bookingCancel(invoiceId){
        let access_token
        access_token = localStorage.getItem("pioneer_token")
        const response = await fetch(`http://localhost:8000/api/bookings/${invoiceId}/cancel/`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${access_token}`,
            }
        })
        if(response.ok){
            setCurrentInvoice({})
            getServices()
            toast("Запись отменена")
        }else if(!response.ok){
            toast.error("Произошла ошибка сервера")
        }
    }
    
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
                    <TableRow key={invoice.id} onClick={()=>{
                            setOpen(true)
                            setCurrentInvoice(invoice)
                        }}>
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
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className={'px-2'}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Бронь №{currentInvoice?.id}</AlertDialogTitle>
                        <AlertDialogDescription>Информация по брони</AlertDialogDescription>
                    </AlertDialogHeader>
                        <div className="block">
                            <Table className={'overflow'}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium text-left">Клиент</TableCell>
                                        <TableCell className={'text-right'}>Имя клиента</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium text-left">Телефон</TableCell>
                                        <TableCell className={'text-right'}>Номер телефона</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium text-left">Автомобиль</TableCell>
                                        <TableCell className={'text-right'}>{currentInvoice?.carModel}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium text-left">Номер авто</TableCell>
                                        <TableCell className={'text-right'}>Номер авто</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium text-left">Услуга</TableCell>
                                        <TableCell className={'text-right'}>{currentInvoice?.serviceMethod}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium text-left">Продолжительность</TableCell>
                                        <TableCell className={'text-right'}>{currentInvoice?.duration}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium text-left">Стоимость</TableCell>
                                        <TableCell className={'text-right'}>{currentInvoice?.price}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Закрыть</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>{setOpenConfirm(true)}} className={'bg-red-800 text-white w-[100%]'}>Отменить запись</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle></AlertDialogTitle>
                        <AlertDialogDescription>
                            Вы действительно хотите отменить бронирование для клиента?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={()=>{bookingCancel(currentInvoice.id)}} className={'bg-red-800 text-white'}>Да</AlertDialogAction>
                        <AlertDialogCancel>Нет</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}