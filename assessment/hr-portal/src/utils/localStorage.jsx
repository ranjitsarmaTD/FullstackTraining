export const loadEmployees = () => {
    const data = localStorage.getItem('employees');
    return data? JSON.parse(data) : null;
}

export const setEmployees = (emp) => {
    localStorage.setItem('employees', JSON.stringify(emp));
}

export const loadLeaveRequests = () => {
    const res = localStorage.getItem('leave-requests')
    const data = JSON.parse(res)

    return data;
}

export const setLeaveRequests = (leave) => {
    localStorage.setItem('leave-requests', JSON.stringify(leave));
}

export const loadLeaveHistory = () => {
    const res = localStorage.getItem('leave-history');
    const data = JSON.parse(res);

    return data;
}

export const setLeaveHistory = (leave) => {
    localStorage.setItem('leave-history', JSON.stringify(leave));
}