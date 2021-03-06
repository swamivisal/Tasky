const taskContainer=document.querySelector(".task_container");

let globalStore=[];

//generate new card
const generateNewCard=(taskData)=>`
    <div class="col-lg-4 col-md-6" >
            <div class="card">
                <div class="card-header d-flex justify-content-end gap-2">
                    <button type="button" class="btn btn-outline-success" id=${taskData.id} onclick="editCard.apply(this,arguments)">
                        <i class="fas fa-pencil-alt" id=${taskData.id} onclick="editCard.apply(this,arguments)"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)">
                        <i class="fas fa-dumpster id=${taskData.id} onclick="taskContainer.apply(this,arguments)""></i>
                    </button>
                </div>
                <img src=${taskData.imageUrl} alt="image"/>
                <div class="card-body">
                    <h5 class="card-title">${taskData.taskTitle}</h5>
                    <p class="card-text">${taskData.taskDescription}</p>
                    <span class="badge bg-primary">${taskData.taskType}</span>
                </div>
                <div class="card-footer text-muted">
                    <button 
                        type="button" 
                        class="btn btn-outline-primary float-end" 
                        id=${taskData.id}
                        data-bs-toggle="modal" 
                        data-bs-target="#showModal"
                        onclick="openCard.apply(this,arguments)"
                    >Open Task</button>
                </div>
            </div>
        </div> 
`;

const loadInitialCardData=()=>{
    //localstorage to get tasky card data
    const getCardData=localStorage.getItem("tasky");

    //convert to normal data
    const {cards}=JSON.parse(getCardData);

    //loop over those task object to generate html card and inject it to DOM
    cards.map((cardObject)=>{
        taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
    //update it to gobal store
        globalStore.push(cardObject);
    })
    

    

};

const saveChanges=()=>{
    const taskData={
        id:`${Date.now()}`,  //unique number for card id
        imageUrl:document.getElementById("imageUrl").value,
        taskTitle:document.getElementById("taskTitle").value,
        taskType:document.getElementById("taskType").value,
        taskDescription:document.getElementById("taskDescription").value
    };

    
    //parent object browser->window
    //html object ->document
    
    
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));

    //page refresh will cause the data to be erased-->local storage-->its max memory space is 5mb-->if we try to use more than that it will throw error
//this is called API(Application Programming Interface),where application ->local storage,programming->javascript,interface->middleman

    globalStore.push(taskData);

    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};

const deleteCard=(event)=>{
    event=window.event;
    const targetId=event.target.id;
    const tagname=event.target.tagName;

    globalStore=globalStore.filter((cardObject)=>cardObject.id!==targetId);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

    if(tagname==="BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode)         
    }
    else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode) 
    }
    

};

//content-editable
const editCard=(event)=>{
    event=window.event;
    const targetId=event.target.id;
    const tagname=event.target.tagName;

    let prentElement;
    if(tagname=="BUTTON"){
        parentElement=event.target.parentNode.parentNode;
        console.log(parentElement)
    }
    else{
        parentElement=event.target.parentNode.parentNode.parentNode;
        console.log(parentElement)
    }
    let taskTitle=parentElement.childNodes[5].childNodes[1];
    let taskDescription=parentElement.childNodes[5].childNodes[3];
    let taskType=parentElement.childNodes[5].childNodes[5];
    let submitButton=parentElement.childNodes[7].childNodes[1];
    
//setAttribute
    submitButton.removeAttribute("onclick");
    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true");
    submitButton.setAttribute("onclick","saveEditChanges.apply(this,arguments)");
    submitButton.innerHTML="Save changes";

};

const saveEditChanges=(event)=>{
    event=window.event;
    const targetId=event.target.id;
    const tagname=event.target.tagName;

    let prentElement;
    if(tagname=="BUTTON"){
        parentElement=event.target.parentNode.parentNode;
        console.log(parentElement)
    }
    else{
        parentElement=event.target.parentNode.parentNode.parentNode;
        console.log(parentElement)
    }

    
    let taskTitle=parentElement.childNodes[5].childNodes[1];
    let taskDescription=parentElement.childNodes[5].childNodes[3];
    let taskType=parentElement.childNodes[5].childNodes[5];
    let submitButton=parentElement.childNodes[7].childNodes[1];

    const updatedData={
        taskTitle:taskTitle.innerHTML,
        taskDescription:taskDescription.innerHTML,
        taskType:taskType.innerHTML
    }

    globalStore=globalStore.map((task)=>{
        if(task.id==targetId){
            return{
                id:task.id,
                imageUrl:task.imageUrl,
                taskTitle:updatedData.taskTitle,
                taskDescription:updatedData.taskDescription,
                taskType:updatedData.taskType,

            };
        }
        return task;
    });
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
    taskTitle.setAttribute("contenteditable","false");
    taskDescription.setAttribute("contenteditable","false");
    taskType.setAttribute("contenteditable","false");
    submitButton.innerHTML="Open task";
    
};

const openCard=()=>{
    event=window.event;

    
    let parentElement=event.target.parentNode.parentNode;
    

    let taskImage=parentElement.childNodes[3].getAttribute("src");
    let taskTitle=parentElement.childNodes[5].childNodes[1].innerHTML;
    let taskDescription=parentElement.childNodes[5].childNodes[3].innerHTML;
    let taskType=parentElement.childNodes[5].childNodes[5].innerHTML;
    
    
    document.getElementsByClassName("showImage")[0].src=taskImage
    document.getElementsByClassName("showTitle")[0].innerHTML=taskTitle
    document.getElementsByClassName("showDescription")[0].innerHTML=taskDescription
    document.getElementsByClassName("showType")[0].innerHTML=taskType

    
    
}





    