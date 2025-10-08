#!/usr/bin/env node
import fs from "fs"
import path from "path"
const file = path.join(__dirname, 'tasks.json');

function loadTask() {
    if(!fs.existsSync(file)) return [];
    const data = fs.readFileSync(file, 'utf-8')
    return JSON.parse(data || []);
}

function saveTask(tasks) {
    fs.writeFileSync(file, JSON.stringify(tasks, null, 2));
}

function findTaskById(id) {
    const tasks = loadTask();
    const index = tasks.findIndex((t) => t.id === id);
    return {tasks, index};
}

function addTask(description) {
    const tasks = loadTask();
    const newTask = {
        id: tasks.length ? tasks.length + 1: 1,
        description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTask(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

function updateTask(id, newDescription) {
    const {task, index} = findTaskById(id);
    if(index === -1) return console.log("task not found");
    task[index].description = newDescription;
    task[index].updatedAt = new Date().toISOString();
    saveTask(task);
    console.log(`Task ${id} updated successfully`); 
}

function deleteTask(id) {
    const {task, index} = findTaskById(id);
    if(index === -1) return console.log("task not found");
    task.splice(index, 1);
    saveTask(task)
    console.log(`Task ${id} deleted successfully.`);
}

function markInProgress(id) {
    const {task, index} = findTaskById(id);
    if(index === -1) return console.log("task not found");
    task[index].status = "in-progress";
    task[index].updatedAt = new Date().toISOString();
    saveTask(task);
    console.log(`Task ${id} mark as in-progress`);
}

function markDone(id) {
    const {task, index} = findTaskById(id);
    if(index === -1) return console.log("task not found");
    task[index].status = "done"
    task[index].updatedAt = new Date().toISOString();
    saveTask(task);
    console.log(`task ${id} mark as done`);
}

function listTasks(status) {
    const tasks = loadTask();

    let filtered = tasks;
    if(status){
        status = status.toLowercase();
        if(["todo", "in-progress", "done"].includes(status)) {
            filtered = tasks.filter((t) => t.status === status);
        } else {
            return console.log("invalid status. USE: todo or in-progress or done");
            
        }
    }
    if(filtered.length === 0){
        return console.log("no task found");
    }

    console.log("\n task list:");
    filtered.forEach((t) => {
        console.log(
            `ID: ${t.id}\nDescription: ${t.description}\nstatus: ${t.status}\ncreated: ${t.createdAt}\nupdated: ${updatedAt}`
        );
        
    });
}

const args = process.argv.slice(2);
const command = args[0];

switch(command) {
    case "add":
        addTask(args[1]);
        break;
    case "update":
        updateTask(parseInt(args[1]), args[2]);
        break;
    case "delete":
        deleteTask(parseInt(args[1]));
        break;
    case "mark-in-progress":
        markInProgress(parseInt(args[1]));
        break;
    case "mark-done":
        markDone(parseInt(args[1]));
        break;
    case "list":
        listTasks(args[1]);
        break;
    default:
        console.log(`
            Unknown command
            Available commands:
                task-cli add "Task description"
                task-cli update <id> "New description"
                task-cli delete <id>
                task-cli mark-in-progress <id>
                task-cli mark-done <id>
                task-cli list [todo|in-progress|done]
            `
        );
}

