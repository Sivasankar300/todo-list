export {displayController}
import { projectsArray} from "./projects";
import { newTask} from "./tasks";

const displayController = (function(){
        const inputForm = document.querySelector("#taskInput");
        inputForm.style.display = "none";


        const newProjectBtn = document.querySelector("#newProjectBtn");
        const sideBar = document.querySelector("#sideBar");
        const tasksArea = document.querySelector("#tasks")
        let counter = 0;

        newProjectBtn.addEventListener("click",createProject);

        function createProject(){
            projects.newProject("defaultProject",[]);
            const newProjectVar = document.createElement("button");
            newProjectVar.textContent = "new project";
            newProjectVar.classList.add("project");
            sideBar.appendChild(newProjectVar);
        }

        (function displayProject(){
         
            
            for(const item of projectsArray.getArray()){
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

        (function updateProjectList(){
            const projectInput = document.querySelector("#project")
          
            projectsArray.getArray().forEach(function(item){
                const createItem = document.createElement("option")
                createItem.setAttribute("value",item.name)
                createItem.textContent = item.name;
                projectInput.appendChild(createItem)
            })
        })();

        (function createTask(){
                const submitBtn = document.querySelector("#submit");

                submitBtn.addEventListener("click", (event) =>  {
                event.preventDefault();
                const taskCount = "task"+counter;
                const title = document.querySelector("#title").value;
                const description = document.querySelector("#description").value;
                const dueDate = document.querySelector("#dueDate").value;
                const priority = document.querySelector("#priority").value;
                const project = document.querySelector("#project").value;
                counter++

                projectsArray.storeTask(newTask(title,description,dueDate,priority,project,taskCount),project)
                displayTasks()
            })
        })();
        
        function displayTasks(){
            const tasksArea = document.querySelector("#tasks");
            
            //To remove the current elements then update it
            while (tasksArea.firstChild) {
                tasksArea.removeChild(tasksArea.lastChild);
            }
            let counter = 0;
            //change this
            const currentProjectArray = projectsArray.getCurrentProjectArray();
            console.log(currentProjectArray)
            currentProjectArray.forEach(displayTaskFn) 

            
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

                const editTaskBtn = document.createElement("button")
                editTaskBtn.textContent = "Edit"
                editTaskBtn.classList.add("edit",`task${counter}`)
                task.appendChild(editTaskBtn)

                const saveEditedTaskBtn = document.createElement("button")
                saveEditedTaskBtn.textContent = "Save"
                saveEditedTaskBtn.classList.add("save",`task${counter}`)
                task.appendChild(saveEditedTaskBtn)
                counter++
            }
            
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

                    const taskCount = event.target.classList[1];
                    projectsArray.deleteTask(taskCount)
                }
            
        });

        
    })();
        
        (function editTask(){


            tasksArea.addEventListener("click",(event)=>{
                
            if(event.target.classList[0]==="edit"){
                const pointer = event.target.classList[1]
                const className = "."+pointer;
                const nodeList = document.querySelectorAll(className)

                //Removing the text entries
                const itemsToEdit = Array.from(nodeList).slice(1,6);
                itemsToEdit.forEach(function (item){
                    switch(item.classList[0]){
                        case "title":
                            item.textContent = "Title: ";
                            addTextInput(item.classList[0],0)
                            break;
                        case "dueDate":
                            item.textContent = "Due Date: ";
                            addDateInput(item.classList[0],1)
                            break;
                        case "description":
                            item.textContent = "Description: ";
                            addTextInput(item.classList[0],2)
                            break;
                        case "priority": 
                            item.textContent = "Priority "
                            addTextInput(item.classList[0],3)
                            break;
                        case "project":
                            item.textContent = "project"
                            addTextInput(item.classList[0],4)
                    }
                    
                })

                function addTextInput(className,index){
                    const input = document.createElement("input")
                    const newClassName = "edited"+className;
                    input.setAttribute("type","text")
                    input.setAttribute("id",newClassName)
                    
                    itemsToEdit[index].appendChild(input)
                }

                function addDateInput(className,index){
                    const input = document.createElement("input")
                    const newClassName = "edited"+className;
                    input.setAttribute("type","date")
                    input.setAttribute("id",newClassName)

                    itemsToEdit[index].appendChild(input)
                }
            }


                

                
            })
        })();

        /* (function saveInput(){
            const editedTitleInput = document.querySelector("#editedtitle").value;
            const editedDueDateInput = document.querySelector(`#editeddueDate`).value;
            const editedDescription = document.querySelector(`#editeddescription`).value;                    
            const editedPriority = document.querySelector(`#editedpriority`).value;                    
            const editedProject = document.querySelector(`#editedproject`).value;

            tasksArea.addEventListener("click",(event)=>{
                if(event.target.classList[0]==="save"){
                    const pointer = event.target.classList[1];
                    
                    
                    projects.getArrayOfProjects().forEach(function(item){
                        console.log(item.taskCount)
                        console.log("pointer: "+pointer)
                        if(item.taskCount === pointer){
                            projects.editTask(editedTitleInput,title,pointer)
                        }
                    })
                }
            })
        })(); */
        
            
    })();