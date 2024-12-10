export {displayController}
import { newProject,storeProjects } from "./projects";
import { newTask,storeTask } from "./tasks";

const displayController = (function(){
        const inputForm = document.querySelector("#taskInput");
        inputForm.style.display = "none";


        const newProjectBtn = document.querySelector("#newProjectBtn");
        const sideBar = document.querySelector("#sideBar");
        const tasksArea = document.querySelector("#tasks")

        newProjectBtn.addEventListener("click",createProject);

        function createProject(){
            newProject("defaultProject");
            const newProjectVar = document.createElement("button");
            newProjectVar.textContent = "new project";
            newProjectVar.classList.add("project");
            sideBar.appendChild(newProjectVar);
        }

        (function displayProject(){
            for(const item of storeProjects.getArray()){
                const currentProject = document.createElement("button");
                currentProject.textContent = item.name;
                currentProject.classList.add("project");
                sideBar.appendChild(currentProject);
            }
        })();

        (function hideForm(){
            const newTaskBtn = document.querySelector("#newTaskBtn");
            newTaskBtn.addEventListener("click",displayInput);

            function displayInput(){
                inputForm.style.display = "block";
            }
            
        })();

        (function formSubmit(){
            const submitBtn = document.querySelector("#submit");
            submitBtn.addEventListener("click", (event) =>  {
                event.preventDefault();

                const title = document.querySelector("#title").value;
                const description = document.querySelector("#description").value;
                const dueDate = document.querySelector("#dueDate").value;
                const priority = document.querySelector("#priority").value;
                const project = document.querySelector("#project").value;

                storeTask(newTask(title,description,dueDate,priority,project))
                displayTasks()
            })
        })()
        /*  */
        function displayTasks(){
            const tasksArea = document.querySelector("#tasks");
            
            //To remove the current elements then update it
            while (tasksArea.firstChild) {
                tasksArea.removeChild(tasksArea.lastChild);
            }
            let counter = 0;
            storeProjects.getArray().forEach(displayTaskFn) 

            
            function displayTaskFn(item){

                const task = document.createElement("div")
                task.classList.add("task", `task${counter}`);
                tasksArea.appendChild(task);

                const title = document.createElement("div");
                title.textContent = "Title: "+item.title;
                title.classList.add("title",`task${counter}`);
                task.appendChild(title);

                const dueDate = document.createElement("div")
                dueDate.textContent = "Due Date: "+item.dueDate;
                dueDate.classList.add("dueDate",`task${counter}`)
                task.appendChild(dueDate);

                const description = document.createElement("div");
                description.textContent = "Description: "+item.description;
                description.classList.add("description",`task${counter}`);
                description.style.display = "none"
                task.appendChild(description);                

                const priority = document.createElement("div")
                priority.textContent = "Priority: " +item.priority;
                priority.classList.add("priority",`task${counter}`)
                priority.style.display = "none"
                task.appendChild(priority);

                const project = document.createElement("div")
                project.textContent = item.project;
                project.classList.add("project",`task${counter}`)
                project.style.display = "none"
                task.appendChild(project);

                const expandTaskBtn = document.createElement("button")
                expandTaskBtn.textContent = "Expand"
                expandTaskBtn.classList.add("expand",`task${counter}`)
                task.appendChild(expandTaskBtn)

                const deleteTaskBtn = document.createElement("button")
                deleteTaskBtn.textContent = "Delete"
                deleteTaskBtn.classList.add("delete",`task${counter}`)
                task.appendChild(deleteTaskBtn)
                counter++
            }
            //reset counter
            counter = 0;
        }

        (function expandTask(){
            tasksArea.addEventListener("click",(event)=>{
                //Getting the name of the unique task class so the button can be associated with it's task
                if(event.target.classList[0]==="expand"){
                    const pointer = event.target.classList[1];
                    const className = "."+pointer;
                const nodeList = document.querySelectorAll(className)
                const itemsToexpand = Array.from(nodeList).slice(3,5);

                itemsToexpand.forEach(hideShowElements)
                function hideShowElements(item){
                    if(item.style.display === "none") 
                        { item.style.display = "block"}
                    else if (item.style.display === "block") 
                        { item.style.display = "none" }
                    }
                }
            })
        })();

        (function deleteTask(){
            tasksArea.addEventListener("click",(event)=>{
                if(event.target.classList[0]==="delete"){
                    const pointer = event.target.classList[1]
                    const className = "."+pointer;
                    const nodeList = document.querySelectorAll(className)
                        //Removing the associated task class and it's elements
                    while(nodeList[0].firstChild){
                        nodeList[0].removeChild(nodeList[0].lastChild)
                    }
                    tasksArea.removeChild(nodeList[0])
                }
        });
        
    })();
        
        
            
    })();