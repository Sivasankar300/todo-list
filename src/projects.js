export {newProject,storeProjects}
function newProject(name,array){
    
    return{name,array}
}

const storeProjects = (function (){
    const defaultProject = newProject("default project",[]); //Default project
    const array = [defaultProject];

    const getArray = () => array

    function store(task){
        array.push(task);
    }
    

    return {getArray,store}
})()


