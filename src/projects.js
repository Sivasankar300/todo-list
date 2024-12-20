export {projectsArray}

const projectsArray = (function(){
    const projectArray = [];
    makeDefaultProject();

    const getArray = () => projectArray

    function makeDefaultProject(){
        const defaultProject = newProject("Default Project",[]); 
        projectArray.push(defaultProject)
    }

    function newProject(name,array){
        return {name,array}
    }

    function storeTask(task,project){
                
        const currentProject = projectArray.find(item => item.name === project)

        currentProject.array.push(task)
    }

    function deleteTask(task,project){
        //Change this later
        const currentProject = projectArray[0].array;
        //Finding the index of the task
        const index = currentProject.map(e => e.taskCount).indexOf(task)
        currentProject.splice(index,1)
    }

    function getCurrentProjectArray(){
        const currentProject = projectArray[0].array;

        return currentProject
    }

    return {getArray,newProject,storeTask,getCurrentProjectArray,storeTask,deleteTask}
})()



/* const projects = (function (){


    function getArrayOfProject(project){
        
    }

    function store(task,project){
        
        array.push(task);
    }

    function pushChanges(){

    }
    

    return {store,pushChanges}
})() */




