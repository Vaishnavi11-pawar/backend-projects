A simple **Command Line Interface (CLI)** tool to fetch and display the **recent GitHub activity** of any user — built using **pure Node.js**, without any external libraries.

---

## 🚀 Project Overview

This project is inspired by the roadmap.sh challenge:  
👉 [https://roadmap.sh/projects/github-user-activity]
You’ll learn how to:
- Work with **APIs** in Node.js  
- Handle **JSON data**  
- Build and run a **CLI-based project**

---

## 🧠 Features

- Accepts a **GitHub username** as a CLI argument  
- Fetches data directly from the **GitHub REST API**  
- Displays user activity in a readable format  
- Handles invalid usernames and network errors gracefully  
- Built using **only core Node.js modules** (no axios, no fetch)

---

## 🛠️ Technologies Used

- **Node.js** (v18+)
- **GitHub REST API**

---

## ⚙️ Installation & Usage

### 1. Clone the Repository
```bash
git clone https://github.com/Vaishnavi11-pawar/backend-projects.git
2. Navigate to the Project Folder
bash
Copy code
cd backend-projects/01-github-user-activity
3. Run the CLI
You can run the CLI directly from the terminal using:

bash
Copy code
node github-activity.js <username>
Example:
bash
Copy code
node github-activity.js Vaishnavi11-pawar
🧩 Example Output
bash
Copy code
Fetching recent activity for user: Vaishnavi11-pawar

- Pushed 1 commit to Vaishnavi11-pawar/backend-projects
- Created repository Vaishnavi11-pawar/backend-projects
- Starred Vaishnavi11-pawar/inventorymanagementsystem
📡 API Reference
The project uses the GitHub public events API:

bash
Copy code
https://api.github.com/users/<username>/events
Example:

bash
Copy code
https://api.github.com/users/kamranahmedse/events
 Error Handling
The CLI gracefully handles:

Invalid usernames (e.g., user not found)

Network errors or rate limits

Missing arguments

Example:
bash
Copy code
$ node github-activity.js
Please provide a GitHub username.
Usage: node github-activity.js <username>

📂 Project Structure
bash
Copy code
backend-projects/
│
├── 01-github-user-activity/
│   ├── github-activity.js   # Main CLI script
│   ├── README.md            # Project documentation
│
└── ...
🧾 License
This project is open-source and available under the MIT License.

