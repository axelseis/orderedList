
export const initialState = {
    users: [],
    App: {
        perpage:15,
        page:1
    },
    filterSelected: 'FirstName',
    filters: [
        {
            id: 'FirstName',
            title: "Información personal",
            asc: false
        },
        {
            id: 'UserId',
            title: "ID",
            asc: false
        },
        {
            id: '_freeTime',
            title: "Vacaciones",
            asc: false
        },
        {
            id: '_startTime',
            title: "Fecha de incorporación a la empresa",
            asc: false
        },
    ]

};

