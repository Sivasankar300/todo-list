export {displayController}
import { projectsArray} from "./projects";
import { newTask} from "./tasks";

const displayController = (function(){
        const inputForm = document.querySelector("#taskInput");
        inputForm.style.display = "none";



        const newProjectBtn = document.querySelector("#newProjectBtn");
        const sideBar = document.querySelector("#sideBar");
        const tasks = document.querySelector("#tasks")
        tasks.style.display = "none"
        //Linking the DOM & property values of tasks
        let taskCounter = 0;
        let projectCounter = 1;
        displayProject()

        newProjectBtn.addEventListener("click",createProject);

        function createProject(){
 
            const projectName = prompt("Enter a name for the project");
            //To prevent a empty input
            if(projectName !== ""){
                projectsArray.storeProject(projectName,projectCounter);
                projectCounter++;
                displayProject();
            }
        }

        function displayProject(){
            const projectsArea = document.querySelector("#projectsArea")
            while (projectsArea.firstChild) {
                projectsArea.removeChild(projectsArea.lastChild);
            }
            for(const item of projectsArray.getArray()){
                const currentProject = document.createElement("button");
                currentProject.textContent = item.name;
                currentProject.classList.add(`project`, `project${item.count}`);
                projectsArea.appendChild(currentProject);
                updateProjectList();
            }
        };

        (function hideForm(){
            const newTaskBtn = document.querySelector("#newTaskBtn");
            newTaskBtn.addEventListener("click",displayInput);
             

            function displayInput(){
                inputForm.style.display = "block";
                tasks.style.display = "none"

            }
            
        })();

        function updateProjectList(){
            const projectInput = document.querySelector("#project")
            while(projectInput.firstChild){
                projectInput.removeChild(projectInput.lastChild)
            }
          
            projectsArray.getArray().forEach(function(item){
                const createItem = document.createElement("option")
                createItem.setAttribute("value",item.name)
                createItem.textContent = item.name;
                projectInput.appendChild(createItem)
            })
        };

        (function createTask(){
                const submitBtn = document.querySelector("#submit");

                submitBtn.addEventListener("click", (event) =>  {
                event.preventDefault();
                const taskCount = "task"+taskCounter;
                const title = document.querySelector("#title").value;
                const description = document.querySelector("#description").value;
                const dueDate = document.querySelector("#dueDate").value;
                const priority = document.querySelector("#priority").value;
                const project = document.querySelector("#project").value;
                taskCounter++

                projectsArray.storeTask(newTask(title,description,dueDate,priority,project,taskCount),project)
                const taskInput = document.querySelector("#taskInput")
                taskInput.style.display = "none"
                tasks.style.display = "block"
                
                

                displayTasks()
            })
        })();
        
        function displayTasks(){
            const tasksArea = document.querySelector("#tasks");
            
            //To remove the current elements then update it
            while (tasksArea.firstChild) {
                tasksArea.removeChild(tasksArea.lastChild);
            }
            //change this
            const currentProjectArray = projectsArray.getCurrentProjectArray();
            currentProjectArray.forEach(displayTaskFn) 

            
            function displayTaskFn(item){

                const task = document.createElement("div")
                task.classList.add("task", `${item.taskCount}`);
                tasksArea.appendChild(task);

                const title = document.createElement("div");
                title.textContent = "Title: "+item.title;
                title.classList.add("title",`${item.taskCount}`);
                task.appendChild(title);

                const dueDate = document.createElement("div")
                dueDate.textContent = "Due Date: "+item.dueDate;
                dueDate.classList.add("dueDate",`${item.taskCount}`)
                task.appendChild(dueDate);

                const description = document.createElement("div");
                description.textContent = "Description: "+item.description;
                description.classList.add("description",`${item.taskCount}`);
                description.style.display = "none"
                task.appendChild(description);                

                const priority = document.createElement("div")
                priority.textContent = "Priority: " +item.priority;
                priority.classList.add("priority",`${item.taskCount}`)
                priority.style.display = "none"
                task.appendChild(priority);

                const project = document.createElement("div")
                project.textContent = "Project: "+item.project;
                project.classList.add("project",`${item.taskCount}`)
                project.style.display = "none"
                task.appendChild(project);

                const expandTaskBtn = document.createElement("button")
                expandTaskBtn.textContent = "Expand"
                expandTaskBtn.classList.add("expand",`${item.taskCount}`)
                task.appendChild(expandTaskBtn)

                const deleteTaskBtn = document.createElement("button")
                deleteTaskBtn.textContent = "Delete"
                deleteTaskBtn.classList.add("delete",`${item.taskCount}`)
                task.appendChild(deleteTaskBtn)

                const editTaskBtn = document.createElement("button")
                editTaskBtn.textContent = "Edit"
                editTaskBtn.classList.add("edit",`${item.taskCount}`)
                task.appendChild(editTaskBtn)

                const saveEditedTaskBtn = document.createElement("button")
                saveEditedTaskBtn.textContent = "Save"
                saveEditedTaskBtn.classList.add("save",`${item.taskCount}`)
                task.appendChild(saveEditedTaskBtn)
                saveEditedTaskBtn.style.display = "none";
            }
            
        }

        (function expandTask(){
            tasks.addEventListener("click",(event)=>{
                //Getting the name of the unique task class so the button can be associated with it's task
                if(event.target.classList[0]==="expand"){
                    const pointer = event.target.classList[1];
                    const className = "."+pointer;
                const nodeList = document.querySelectorAll(className)
                const itemsToexpand = Array.from(nodeList).slice(3,6);

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
            tasks.addEventListener("click",(event)=>{
                if(event.target.classList[0]==="delete"){
                    const pointer = event.target.classList[1]
                    const className = "."+pointer;
                    const nodeList = document.querySelectorAll(className)
                        //Removing the associated task class and it's elements
                    while(nodeList[0].firstChild){
                        nodeList[0].removeChild(nodeList[0].lastChild)
                    }
                    tasks.removeChild(nodeList[0])

                    const taskCount = event.target.classList[1];
                    projectsArray.deleteTask(taskCount)
                }
            
        });

        
    })();
        
        (function editTask(){


            tasks.addEventListener("click",(event)=>{
            if(event.target.classList[0]==="edit"){
                const pointer = event.target.classList[1]
                const className = "."+pointer;
                const nodeList = document.querySelectorAll(className)
                
                const saveBtn = document.querySelector(`div.${pointer} .save`);
                saveBtn.style.display = "block";

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
                            addDropDownInput(item.classList[0],4)
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

                function addDropDownInput(className,index){
                    const input = document.createElement("select")
                    const newClassName = "edited"+className;
                    input.setAttribute("id",newClassName)
                    itemsToEdit[index].appendChild(input)

                    //To list the projects
                    projectsArray.getArray().forEach(function(item){
                    {const createItem = document.createElement("option")
                    createItem.setAttribute("value",item.name)
                    createItem.textContent = item.name;
                    input.appendChild(createItem)}
                    })
                }
            }


                

                
            })
        })();

        (function saveInput(){
            tasks.addEventListener("click",(event)=>{
                
                
                
                if(event.target.classList[0]==="save"){
                //To hide the save button that was clicked
                const taskCount = event.target.classList[1];
                const saveBtn = document.querySelector(`div.${taskCount} .save`);
                saveBtn.style.display="none"

                                
                const editedTitleInput = document.querySelector("#editedtitle").value;
                const editedDueDateInput = document.querySelector(`#editeddueDate`).value;
                const editedDescriptionInput = document.querySelector(`#editeddescription`).value;                    
                const editedPriorityInput = document.querySelector(`#editedpriority`).value;                    
                const editedProjectInput = document.querySelector(`#editedproject`).value;

                const inputsList = []
                function inputsListObjects(inputValue,inputType){
                    return {inputValue,inputType}
                }
                const title = inputsListObjects(editedTitleInput,"title");
                const dueDate = inputsListObjects(editedDueDateInput,"dueDate")
                const description = inputsListObjects(editedDescriptionInput,"description")
                const priority = inputsListObjects(editedPriorityInput,"priority")
                const project = inputsListObjects(editedProjectInput,"project")

                inputsList.push(title)
                inputsList.push(dueDate)
                inputsList.push(description)
                inputsList.push(priority)
                inputsList.push(description)
                inputsList.push(project)

                //looping through all the input elements and calling the function on ones with values
                inputsList.forEach(function(item){
                    if(item.inputValue === ""){

                    }
                    else{
                        projectsArray.editTask(taskCount,item.inputType,item.inputValue)
                    }
                })

                //To remove the input and update the fields
                displayTasks();
                
                    
                    
                }
            })
        })();

        (function projectSwitcher(){
            const projectsArea = document.querySelector("#projectsArea")
            projectsArea.addEventListener("click",(event) => {
                if(event.target.classList[0]==="project"){
                    const currentArrayIndex = event.target.classList[1];
                    projectsArray.switchCurrentProject(currentArrayIndex)
                    displayTasks()
                }
            })
            
        })()
        
            
    })();