

export function setAgenda(eventId: string, agendaDescription: string) : void {
    const storedAgenda = localStorage.getItem('agendaList');
    const agendaList = storedAgenda ? JSON.parse(storedAgenda) : {};
    agendaList[eventId] = agendaDescription;
    localStorage.setItem('agendaList', JSON.stringify(agendaList));
}


export function getAgenda(eventId: string): string | null {
    const storedAgenda = localStorage.getItem('agendaList');
    const agendaList = storedAgenda ? JSON.parse(storedAgenda) : {};

    return agendaList[eventId] || null;
}
