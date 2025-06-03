let tasks=[];
console.log("hello");
document.addEventListener("DOMContentLoaded",()=>
{
      const storedTask=JSON.parse(localStorage.getItem('tasks'));
      if(storedTask){
      storedTask.forEach((task)=>tasks.push(task));
      updateTasklist();
      updateStats();
      }
});
const taskinp=document.querySelector("#taskinput");
//console.log(taskinp.value.trim());
const addTask=()=>{
      const text=taskinp.value.trim();
      // console.log(text);
      if(text){
            tasks.push({text:text,completed:false});
            //console.log(tasks);
            taskinp.value="";
            //console.log(taskinp);
            updateTasklist();
            updateStats();
            //saveTask();
      }
}
document.querySelector("button").addEventListener("click",(e)=>{
      e.preventDefault();
      addTask();
});   
const  updateTasklist=()=>{
      const tasklist=document.querySelector(".task-list");
      //console.log(tasklist);
      tasklist.innerHTML="";

      tasks.forEach((task,index) => {
            const listitem=document.createElement("li");
            listitem.innerHTML=`
            <div class="taskitem" >
                 <div class="tasktest ${task.completed?'completed':""}">
                        <input type="checkbox" class="checkbox" ${task.completed?'checked':''}>
                        <p>${task.text}</p>
                  </div>
                  <div class="icon">
                        <img src="edit.png" onclick="editTask(${index})"/>
                        <img src="delete.png" onclick="deleteTask(${index})"/>
                  </div>
            </div>`;
            listitem.addEventListener("change",()=>toggleTaskcomplete(index));
                  tasklist.append(listitem);
            
      });
};
      const toggleTaskcomplete=(index)=>{
            tasks[index].completed=!tasks[index].completed;
            updateTasklist();
            updateStats();
            saveTask();
      }
      const deleteTask=(index)=>{
            tasks.splice(index,1);
            updateTasklist();
            updateStats();
            saveTask();
      }
      const editTask=(index)=>{
            const taskinput=document.querySelector("#taskinput");
            taskinput.value=tasks[index].text;
            tasks.splice(index,1);
            updateTasklist();
            updateStats();
            saveTask();
      }
      const updateStats=()=>{
          const completedtask=tasks.filter(task=>task.completed).length;
            const totaltask=tasks.length;
            const progress=totaltask === 0 ? 0 : (completedtask / totaltask) * 100;
            const progressbar=document.querySelector("#progress-level");
            progressbar.style.width=`${progress}%`;
            document.querySelector("#score").innerText=`${completedtask}/${totaltask}`;
            if(tasks.length && completedtask===totaltask){
                  blastconfetti(); 
            }

      };
      const blastconfetti=()=>{
            const defaults = {
                  spread: 360,
                  ticks: 50,
                  gravity: 0,
                  decay: 0.94,
                  startVelocity: 30,
                  shapes: ["star"],
                  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
                };
                
                function shoot() {
                  confetti({
                    ...defaults,
                    particleCount: 40,
                    scalar: 1.2,
                    shapes: ["star"],
                  });
                
                  confetti({
                    ...defaults,
                    particleCount: 10,
                    scalar: 0.75,
                    shapes: ["circle"],
                  });
                }
                
                setTimeout(shoot, 0);
                setTimeout(shoot, 100);
                setTimeout(shoot, 200);
      }

const saveTask=()=>
{
      localStorage.setItem('tasks',JSON.stringify(task));
};