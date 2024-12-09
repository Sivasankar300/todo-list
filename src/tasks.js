export {newTask,storeTask}
import { storeProjects } from "./projects";

function newTask(title, description,dueDate,priority,project/*,notes,checklist */){
    /*  Get user's input 
        Pass that through a constructor
        Store that in a storage array */

    /* Take in those variables and make an object */

    return {title,description,dueDate,priority,project/* ,notes,checklist, */};

}

function storeTask(task){
    storeProjects.store(task)
    console.log(storeProjects.getArray())
}