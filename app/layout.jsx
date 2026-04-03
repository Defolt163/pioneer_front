
import './globals.css'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from '@/componentsShadCN/ui/sonner';

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'PIONEER — Агрегатор услуг',
  description: 'Запись на автомойку и шиномонтаж',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="ru">
      <body>
        <div className="mobile-frame">
          {children}
        </div>
        <Toaster/>
      </body>
    </html>
  )
}
