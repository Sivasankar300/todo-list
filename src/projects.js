export {newProject,storedProjects}
function newProject(name,array){
    
    return{name,array}
}

const storedProjects = function(){
    const defaultProject = newProject("default project",[]); //Default project
    const array = [defaultProject];
    

    return array
}


