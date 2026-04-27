let todoIndex=1;
function addTodo(){
    //alert("hi there");
    // read the code from the input box
    // add new todo to the document(DOM manupulation)
    // clear the todo

    // let element= document.getElementById("todoInput");
    // const todo=element.value;
    //console.log(todo);                          //gets this in console in browser

    // const newdiv=document.createElement("div");
    // //newdiv.innerHTML=todo;
    // newdiv.innerHTML="<span>"+ todo + "</span <button> Delete Todo </button>";

    // const parentDiv=document.getElementById("todos");
    // parentDiv.appendChild(newdiv);

//         Same thing- better code
//     const element =document.getElementById("todoInput");
//     const todo=element.value;

//     const newdiv= document.createElement("div");
//    // newdiv.innerHTML=<><span>${todo}</span><button>Delete</button></>;
//     newdiv.innerHTML=`<span>${todo}</span><button>Delete</button>`;

//     const parentdiv=document.getElementById("todos");
//     parentdiv.appendChild(newdiv);


    const element=document.getElementById("todoInput");
    const todo=element.value;
    if(todo==""){
        return;
    }
    element.value="";             // so that input box gets clear after reading value , last step

    const todoDiv=document.createElement("div");
    todoDiv.setAttribute("id","todo"+ todoIndex);        // todo1, todo2, ... , 2nd last step

    const todoSpan=document.createElement("span");
    todoSpan.innerHTML=todo;

    todoDiv.appendChild(todoSpan);

    const todoButton=document.createElement("button");
    todoButton.innerHTML="delete";
   // todoButton.setAttribute("onclick","deleteTodo( " +todoIndex + ")");
    todoButton.setAttribute("onclick", `deleteTodo(${todoIndex})`);      // 3rd last step


    todoDiv.appendChild(todoButton);

    // const parentDiv=document.createElement("todos");
    // parentDiv.appendChild(todoDiv);
    document.getElementById("todos").appendChild(todoDiv);
    todoIndex+=1;
}


function deleteTodo(index){
    //alert("delete todo"+ index);
    const divElement=document.getElementById("todo" + index); // looks for todo with index 1,2,3 ...
    divElement.parentElement.removeChild(divElement);
    //document.getElementById("todos").removeChild(divElement);
    // divElement.remove()             // modern way
}


