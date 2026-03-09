'use client'
import Button from "@/components/ui/Button";
import TopBar from "@/components/ui/TopBar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/componentsShadCN/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/componentsShadCN/ui/card";
import { Input } from "@/componentsShadCN/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/componentsShadCN/ui/table";
import { Textarea } from "@/componentsShadCN/ui/textarea";
import { organizationService } from "@/services/organizationService";
import { useState } from "react";

export default function ServicesBlock(){
    const organizationData2 = {
        organizationId: 1337,
        userOrganization: true,
        userOrganizationStatus: 'approved',
        organizationFullName: "OOO IDINAHUI",
        organizationShortName: "OBNAL",
        organizationDateRegistration: '10/10/2026',
        organizationDateApproved: '13/10/2026',
        orgOgrn: 12345435212,
        orgInn: 12312312353466765,
        orgKpp: 7777436213476127,
        countServices: 12,
        summaryPrice: 12000,
        organizationServiceWash: true,
        organizationServiceTyre: false,
        services: [
            {
                id: 0,
                title: "Экспресс",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                duration: 30,
                createdAt: '10/01/2026',
                price: 400,
                status: 'active'
            },
            {
                id: 1,
                title: "Комплекс",
                description: 'Lorem ipnsum3232312312412',
                duration: 60,
                createdAt: '10/01/2026',
                price: 600,
                status: 'ghost'
            }
        ]
    }
    const [organizationData, setOrganizationData] = useState(organizationData2)

    const [isExpanded, setIsExpanded] = useState(false)
    
    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength)
    }

    // Состояние для отслеживания, какая услуга в режиме редактирования
    const [editingServiceId, setEditingServiceId] = useState(null)
    
    // Состояние для временных данных при редактировании
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
        duration: '',
        price: ''
    })

    // Функция для начала редактирования
    const startEditing = (service) => {
        setEditingServiceId(service.id)
        setEditFormData({
        title: service.title,
        description: service.description,
        duration: service.duration,
        price: service.price
        })
    }

    // Функция для обработки изменений в инпутах
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditFormData(prev => ({
        ...prev,
        [name]: value
        }))
    }

    // Функция для сохранения изменений
    const saveChanges = (serviceId) => {
        setOrganizationData(prev => ({
        ...prev,
        services: prev.services.map(service =>
            service.id === serviceId
            ? { ...service, ...editFormData }
            : service
        )
        }))
        setEditingServiceId(null) // Выходим из режима редактирования
    }

    // Функция для отмены редактирования
    const cancelEditing = () => {
        setEditingServiceId(null)
    }
    
    return(
        <div className="services">
            {organizationData.services.map((service)=>(
                <Card key={service.id} size="sm" className="mx-auto mt-6 relative">
                    <CardHeader>
                        {editingServiceId === service.id ? (
                            // Режим редактирования
                            <>
                                <Input
                                name="title"
                                value={editFormData.title}
                                onChange={handleInputChange}
                                placeholder="Название услуги"
                                className="mb-2 text-sm"
                                />
                                <Textarea
                                name="description"
                                value={editFormData.description}
                                onChange={handleInputChange}
                                placeholder="Описание услуги"
                                className="mb-2 text-sm"
                                />
                            </>
                            ) : (
                                <>
                                    <CardTitle>{service.title}</CardTitle>
                                    <CardDescription>
                                        {isExpanded ? service.description : truncateText(service.description)}
                                        {service.description.length > 150 && (
                                            <span
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className={"ml-1 text-sm font-medium pointed" + isExpanded ? "text-blue-700" : 'text-black'}
                                            >
                                            {isExpanded ? ' Свернуть' : '...'}
                                            </span>
                                        )}
                                    </CardDescription>
                                </>
                            )
                        }
                    </CardHeader>
                    <CardContent>
                        <p>
                            Дата создания: {service.createdAt}
                        </p>
                        {editingServiceId === service.id ? (
                            <>
                                <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Продолжительность:</label>
                                <Input
                                className={'text-sm'}
                                    name="duration"
                                    value={editFormData.duration}
                                    onChange={handleInputChange}
                                    placeholder="Продолжительность"
                                />
                                </div>
                                <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Стоимость:</label>
                                <Input
                                className={'text-sm'}
                                    name="price"
                                    value={editFormData.price}
                                    onChange={handleInputChange}
                                    placeholder="Стоимость"
                                />
                                </div>
                            </>
                        ) : (
                            <>
                                <p>
                            Продолжительность: {service.duration}
                            </p>
                            <p>
                                Стоимость: {service.price}
                            </p>
                            </>
                        )
                    }
                    <p className="block relative">Статус: {service.status == 'active' ? 'Активный' : service.status == 'ghost' ? 'Скрыт' : 'Не найден'} 
                        <span 
                            className={`absolute rounded aspect-square w-[10px] top-[50%] translate-x-[10px] translate-y-[-50%] ${service.status == "active" ? "bg-green-600" : "bg-gray-500"}`}></span></p>
                    </CardContent>
                    <CardFooter className={'flex gap-2'}>
                        {editingServiceId === service.id ? (
                            // Кнопки в режиме редактирования
                            <>
                                <Button
                                onClick={() => saveChanges(service.id)}
                                customWidth="10px 10px"
                                customFontSize
                                className="text-xs bg-green-600 hover:bg-green-700"
                                >
                                Сохранить
                                </Button>
                                <Button
                                onClick={cancelEditing}
                                variant="outline"
                                customWidth="10px 10px"
                                customFontSize
                                className="text-xs"
                                >
                                Отмена
                                </Button>
                            </>
                            ) : (
                                <>
                                    <Button 
                                        onClick={() => startEditing(service)}
                                        customWidth="10px 10px"
                                        customFontSize
                                        className={'text-xs top-[10px] right-[10px] bg-black'}>
                                        Изменить
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant = 'red' customWidth='10px 10px' customFontSize className={'text-xs top-[10px] right-[10px] bg-black'}>
                                                Скрыть
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogDescription>
                                                Услуга не будет выводиться в списке пока вы снова не включите видимость
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogAction className={'bg-red-800 text-white'}>Скрыть</AlertDialogAction>
                                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant = 'red' customWidth='10px 10px' customFontSize className={'text-xs top-[10px] right-[10px] bg-black'}>
                                                Удалить
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogDescription>
                                                Услуга будет безвозвратно удалена
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogAction className={'bg-red-800 text-white'}>Удалить</AlertDialogAction>
                                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </>
                            )
                        }
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}