export const ROUTES = {
  home: '/',
  selectRole: '/select-role',
  register: '/register',
  services: '/services',
}

export const USER_ROLES = [
  {
    id: 'client',
    label: 'Владельцам транспортных средств',
    description: 'Запись на мойку и шиномонтаж',
    href: '/login',
    icon: 'car',
  },
  {
    id: 'organization',
    label: 'Организациям-партнёрам',
    description: 'Подключение к агрегатору',
    href: '/org/connect',
    icon: 'building',
  },
  {
    id: 'admin',
    label: 'Администратор',
    description: 'Управление заявками',
    href: '/admin/requests',
    icon: 'shield',
  },
]
