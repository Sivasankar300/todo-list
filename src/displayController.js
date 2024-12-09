export {displayController}
import { newProject,storeProjects } from "./projects";
import { newTask,storeTask } from "./tasks";

const displayController = (function(){
        const inputForm = document.querySelector("#taskInput");
        inputForm.style.display = "none";


        const newProjectBtn = document.querySelector("#newProjectBtn");
        const sideBar = document.querySelector("#sideBar");

        newProjectBtn.addEventListener("click",createProject);

        function createProject(){
            newProject("defaultProject");
            const newProjectVar = document.createElement("button");
            newProjectVar.textContent = "new project";
            newProjectVar.classList.add("project");
            sideBar.appendChild(newProjectVar);
        }

        (function displayProject(){
            /* console.log(storeProjects().getArray())
            for(const item of storeProjects.getArray()){
                const currentProject = document.createElement("button");
                currentProject.textContent = item.name;
                currentProject.classList.add("project");
                sideBar.appendChild(currentProject);
            } */
        })();

        (function taskInput(){
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
            })
        })()

    })()