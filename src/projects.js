export {projectsArrayFn as projectsArray}

const projectsArrayFn = (function(){
    const projectArray = [];
    let currentProjectIndex = 0;
    makeDefaultProject();

    const getArray = () => projectArray

    function makeDefaultProject(){
        const defaultProject = newProject("Default Project",[],0); 
        projectArray.push(defaultProject)
    }

    function newProject(name,array,count){
        return {name,array,count}
    }

    function storeProject(projectName,count){
        const newProjectVar = newProject(projectName,[],count)
        projectArray.push(newProjectVar);
    }

    function storeTask(task,project){
        const projectToSaveArrayIn = projectArray.find(item => item.name === project)

        projectToSaveArrayIn.array.push(task)
        console.table(projectArray)
    }

    function deleteTask(taskCount){
        //Finding the index of the task
        const currentProject = projectArray[currentProjectIndex].array
        const index = currentProject.map(e => e.taskCount).indexOf(taskCount)
        projectArray[currentProjectIndex].array.splice(index,1)
    }

    function getCurrentProjectArray(){
        return projectArray[currentProjectIndex].array;
    }
    
    function editTask(taskCount,inputType,inputValue){
        const currentProject = projectArray[currentProjectIndex].array        
        const index = currentProject.map(e => e.taskCount).indexOf(taskCount)
        currentProject[index][inputType] = inputValue;
    }

    function switchCurrentProject(projectCount){
        const index = projectCount.slice(7,8);
        console.log(index)
        currentProjectIndex = index;
        return currentProjectIndex;
    }

    return {getArray,newProject,storeTask,getCurrentProjectArray,storeTask,deleteTask,editTask,storeProject,switchCurrentProject}
})()








