import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
    const [id, setId] = useState(1);
    const [list, setList] = useState([]);

    const [taskName, setTaskName] = useState('');
    const [taskStatus, setTaskStatus] = useState('completed');
    const [enableEdit, setEnableEdit] = useState(false);
    const [editId, setEditId] = useState(-1);

    // Load tasks from local storage on component mount
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            setList(tasks);
            if (tasks.length > 0) {
                setId(tasks[tasks.length - 1].id + 1);
            }
        }
    }, []);

    // Save tasks to local storage whenever the list changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(list));
    }, [list]);

    function hadleTaskName(e) {
        setTaskName(e.target.value);
    }

    function handleTaskStatus(e) {
        setTaskStatus(e.target.value);
    }

    function addTask(taskName, taskStatus) {
        const obj = {
            "id": id,
            "name": taskName,
            "status": taskStatus
        };
        setList([...list, obj]);
        setId(id + 1);
    }

    function editTask(idToEdit) {
        setEditId(idToEdit);
        const obj = list.find(l => l.id === idToEdit);
        enableEdit ? setTaskName('') : setTaskName(obj.name);
        enableEdit ? setTaskStatus('completed') : setTaskStatus(obj.status);
    }

    function makeEdit(taskNameToEdit, taskStatusToEdit) {
        const updatedList = list.map(task =>
            task.id === editId ? { ...task, name: taskNameToEdit, status: taskStatusToEdit } : task
        );
        setList(updatedList);
        setEnableEdit(false);
        setTaskName('');
        setTaskStatus('completed');
    }

    function removeTask(idToDel) {
        let newList = list.filter(l => l.id !== idToDel);

        newList = newList.map((task, index) => ({
            ...task,
            id: index + 1,
        }));

        setList(newList);
        setId(newList.length + 1);
    }

    return (
        <GlobalContext.Provider value={{ list, addTask, removeTask, taskName, taskStatus, hadleTaskName, handleTaskStatus, setTaskName, setTaskStatus, editTask, enableEdit, setEnableEdit, makeEdit }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
