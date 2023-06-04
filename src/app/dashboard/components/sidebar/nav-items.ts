interface NavItem {
    path: string,
    title: string,
    icon?: string
};

export const generalLinks: NavItem[] = [
    {
        path: 'home',
        title: 'Home',
        icon: 'dashboard'
    },
    {
        path: 'estudiantes',
        title: 'Estudiantes',
        icon: 'school'
    },
    {
        path: 'clases',
        title: 'Clases',
        icon: 'assignment'
    },
    {
        path: 'inscripciones',
        title: 'Inscripciones',
        icon: 'edit_document'
    },
];

export const settingsLinks: NavItem[] =[
    {
        path: 'cuenta',
        title: 'Cuenta',
        icon: 'account_circle'
    },
];

