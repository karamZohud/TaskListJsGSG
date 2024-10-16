
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskCounter = tasks.length > 0 ? tasks.length++ : 0;
    
    // Menu to manage tasks
    function taskManagerMenu() {
      console.log( "Task Manager Menu:\n" +
          "1. Add Task\n" +
          "2. View Tasks\n" +
          "3. Toggle Task Completion\n" +
          "4. Edit Task\n" +
          "5. Delete Task\n" +
          "6. Exit\n" +
          "Please enter your choice (1-6):");
      
      let choice;
      do {
        choice = prompt(
          "Task Manager Menu:\n" +
          "1. Add Task\n" +
          "2. View Tasks\n" +
          "3. Toggle Task Completion\n" +
          "4. Edit Task\n" +
          "5. Delete Task\n" +
          "6. Exit\n" +
          "Please enter your choice (1-6):"
        );
        console.log(choice);
    
        switch (choice) {
          case '1':
            addTask();
            break;
          case '2':
            viewTasks();
            break;
          case '3':
            toggleTask();
            break;
          case '4':
            editTask();
            break;
          case '5':
            deleteTask();
            break;
          case '6':
            alert("Exiting task manager.");
            break;
          default:
            alert("Invalid choice, please enter a number between 1 and 6.");
        }
      } while (choice !== '6');
    }
    
    // Function to add a task
    function addTask() {
      const taskText = prompt("Enter task description:");
      if (taskText) {
        const newTask = {
          id: ++taskCounter, // Increment task counter
          description: taskText,
          completed: false,
        };
        tasks.push(newTask);
        saveTasks();
        alert("Task added successfully!");
        viewTasks(); // Print updated task list
      }
    }
    
    // Function to view tasks
    function viewTasks() {
      if (tasks.length === 0) {
        alert("No tasks available.");
      } else {
        let taskList = "Your Tasks:\n";
        tasks.forEach(task => {
          if (task && task.id !== undefined) {
            taskList += `${task.id}: ${task.description} [${task.completed ? 'Completed' : 'Not Completed'}]\n`;
          }
        });
        console.log(taskList);
      }
    }
    
    // Function to toggle task completion
    function toggleTask() {
      const taskId = parseInt(prompt("Enter task ID to toggle completion:"));
      
      if (isNaN(taskId)) {
        alert("Invalid task ID.");
        return;
      }
    
      const task = tasks.find(t => t && t.id === taskId);
    
      if (task) {
        task.completed = !task.completed; // Toggle the completion status
        saveTasks();
        alert(`Task ${taskId} is now marked as ${task.completed ? 'Completed' : 'Not Completed'}`);
        viewTasks(); // Print updated task list
      } else {
        alert("Task not found.");
      }
    }
    
    // Function to edit a task
    function editTask() {
        const taskId = parseInt(prompt("Enter task ID to edit:"));
      
        // Check if taskId is a valid number
        if (isNaN(taskId)) {
          alert("Invalid task ID.");
          return;
        }
      
        // Find the task by ID and ensure task is not null or undefined
        const task = tasks.find(t => t && t.id === taskId);
      
        if (task) {
          const newDescription = prompt("Edit task description:", task.description);
          if (newDescription) {
            task.description = newDescription;
            saveTasks();
            alert("Task updated successfully.");
            viewTasks(); // Print updated task list
          }
        } else {
          alert("Task not found.");
        }
      }
    // Function to delete a task
    function deleteTask() {
      const taskId = parseInt(prompt("Enter task ID to delete:"));
      
      if (isNaN(taskId)) {
        alert("Invalid task ID.");
        return;
      }
    
      const taskIndex = tasks.findIndex(t => t && t.id === taskId);
    
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); // Remove the task from the array
        saveTasks();
        alert("Task deleted successfully.");
        viewTasks(); // Print updated task list
      } else {
        alert("Task not found.");
      }
    }
    
    // Function to save tasks to localStorage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Start the task manager
    taskManagerMenu();
    