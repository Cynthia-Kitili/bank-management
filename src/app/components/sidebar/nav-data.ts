import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: '/assets/images/grid-3x3-gap-fill.png',
        label: 'Dashboard',
        access: 'ADMIN,BANK ADMIN'
    },

    {
        routeLink: 'banks',
        icon: '/assets/images/diagram-3-fill.png',
        label: 'Bank Management',
        access: 'ADMIN'
    },
    {
        routeLink: 'customers',
        icon: '/assets/images/people-fill.png',
        label: 'Customer Management',
        access: 'BANK ADMIN'
    },
    {
        routeLink: 'users',
        icon: '/assets/images/person-plus-fill.png',
        label: 'User Management',
        access: 'ADMIN'
    },


];