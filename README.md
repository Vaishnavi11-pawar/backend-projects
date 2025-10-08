# 🧠 Task Tracker CLI

A simple **Command Line Interface (CLI)** application to track and manage your daily tasks — built using **Node.js** and **JSON file storage**, with **no external libraries** or databases.

This project helps you practice:
- Working with the filesystem (`fs` module)
- Handling user inputs from the command line
- Building simple but useful CLI tools

---

## 🚀 Features

✅ Add new tasks  
✅ Update existing tasks  
✅ Delete tasks  
✅ Mark tasks as **in-progress** or **done**  
✅ List all tasks or filter by status  
✅ All data stored locally in a `tasks.json` file  

---

## 📦 Project Structure

task-tracker/
│
├── task-cli.js # Main CLI script
├── tasks.json # Stores your tasks
├── package.json # Node project metadata
└── README.md # Project documentation

yaml
Copy code

---

## ⚙️ Installation and Setup

### 1. Clone the repository
```bash
git clone <YOUR_PROJECT_REPO_URL>
cd task-tracker
2. Initialize the project
bash
Copy code
npm init -y
3. Create the required files
bash
Copy code
touch task-cli.js
echo "[]" > tasks.json
4. Make the script executable
Add this line to your package.json under "bin":

json
Copy code
"bin": {
  "task-cli": "./task-cli.js"
}
Then run:

bash
Copy code
chmod +x task-cli.js
npm link
This will make the task-cli command available globally on your system.

🧰 Commands and Usage
Command	Description	Example
task-cli add "Task description"	Add a new task	task-cli add "Buy groceries"
task-cli update <id> "New description"	Update task description	task-cli update 1 "Buy groceries and cook dinner"
task-cli delete <id>	Delete a task	task-cli delete 1
task-cli mark-in-progress <id>	Mark a task as in-progress	task-cli mark-in-progress 1
task-cli mark-done <id>	Mark a task as done	task-cli mark-done 1
task-cli list	List all tasks	task-cli list
task-cli list todo	List only "todo" tasks	task-cli list todo
task-cli list in-progress	List only "in-progress" tasks	task-cli list in-progress
task-cli list done	List only "done" tasks	task-cli list done

🗂 Task Properties
Each task in the tasks.json file includes:

json
Copy code
{
  "id": 1,
  "description": "Buy groceries",
  "status": "todo",
  "createdAt": "2025-10-08T10:00:00Z",
  "updatedAt": "2025-10-08T10:00:00Z"
}
🧑‍💻 Example Usage
bash
Copy code
task-cli add "Complete project documentation"
# ✅ Task added successfully (ID: 1)

task-cli list
# 📋 Task List:
# ID: 1
# Description: Complete project documentation
# Status: todo

task-cli mark-done 1
# ✅ Task 1 marked as done.

task-cli list done
# Shows all done tasks
📁 Data Storage
All tasks are stored in a local file named tasks.json in the project directory.
This file is automatically created if it does not exist.

No external databases are used.

🌐 Project Page URL
Project Page: https://roadmap.sh/projects/task-tracker

(Replace this link with your GitHub repository if you’re uploading the project there.)

🏁 Conclusion
This Task Tracker CLI helps you:

Understand Node.js filesystem operations

Learn how CLI apps parse commands and arguments

Build real-world utilities without any frameworks

💡 You can later enhance this project with colors, command aliases, or even convert it into a GUI/web app.

