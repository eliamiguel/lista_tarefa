'use strict'



const getBanco = ()=> JSON.parse(localStorage.getItem('familia')) ?? []
const setBanco= (banco)=> localStorage.setItem('familia', JSON.stringify(banco))

 const criarItem = (texto, status, indice) =>{
    const label = document.createElement('label')
        label.setAttribute('class', 'todo__item')
        label.innerHTML=   `
          <input type="checkbox" ${status} data-indice=${indice}>
          <div>${texto}</div>
          <input type="button" value="X" data-indice=${indice}>
          `
    document.getElementById('todoList').appendChild(label)
 }



 const atualizarTela = ()=>{
  limparTela()
  const banco = getBanco()
    banco.forEach((item, indice)=> criarItem(item.tarefa, item.status, indice))
 }

 const limparTela =()=>{
  const todoList = document.getElementById('todoList')

  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild) 
 }

 }

 
const inserirTarefa = (evento)=>{
      const clicki = evento.key
      const texto = evento.target.value
      const limparInput =()=>  evento.target.value= ''

      if(clicki === 'Enter'){
        
        if(texto.length > 0){
        const banco = getBanco()
        banco.push({'tarefa':texto , 'status':''})
        setBanco(banco)
        atualizarTela()
        limparInput()
      }
      }

}

const removerItem = (indice)=>{
  const banco = getBanco()
    banco.splice(indice, 1)
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (indice)=>{
  const banco = getBanco()
 banco[indice].status= banco[indice].status === '' ? 'checked' : '';
 setBanco(banco)
 atualizarTela()
 
}

const clickItem =(evento)=>{
  const elemento = evento.target
  
 if(elemento.type === 'button'){
  const indice = elemento.dataset.indice
  removerItem(indice)

 }else if(elemento.type === 'checkbox'){
  const indice = elemento.dataset.indice
  atualizarItem(indice)
 }
  

}

document.getElementById('newItem').addEventListener('keypress', inserirTarefa)
document.getElementById('todoList').addEventListener('click', clickItem)

atualizarTela()


  


