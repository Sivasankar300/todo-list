export {displayController}
import { newProject,storedProjects } from "./projects";

const displayController = (function(){
    console.log(storedProjects())

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
            for(const item of storedProjects()){
                const currentProject = document.createElement("button");
                currentProject.textContent = item.name;
                currentProject.classList.add("project");
                sideBar.appendChild(currentProject);
            }
        })()

        function taskInput(){
            const form = document.createElement("form")
            
        }

    })()