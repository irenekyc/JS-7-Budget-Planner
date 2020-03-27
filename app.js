// ADD
const inputConfirm = document.querySelector('.confirm-btn')
const inputType = document.querySelector('.add__type')
const inputValueField = document.getElementById('input--value')
const inputDescriptionField = document.getElementById('input--description')
const listContainer = document.querySelector('.lists-container')
let outputList
let itemID
const editListen = document.querySelector('.lists-container')

editListen.addEventListener('click', (e)=>{
    if (e.target.id === 'deleteItem'){
        let deleteItemID = e.target.parentNode.parentNode.id
        deleteItem (deleteItemID)
        deleteDisplay(deleteItemID)
    }
})

const deleteItem = (deleteItemID)=>{
    let ids = []
    let index
    data.forEach((item)=>{
        ids.push(item.id)
    })
    index = ids.indexOf(deleteItemID)
    data.splice(index,1)
    calculateAfterDelete(data)
    
}

inputConfirm.addEventListener('click', ()=>{
    //Read the type (inc or exp)
    const inputTypeValue = inputType.options[inputType.selectedIndex].value
    //Read the value
    const inputValue = Number(inputValueField.value)
    //Read the description
    const inputDescription = inputDescriptionField.value
    addItem(inputTypeValue, inputValue, inputDescription)
})
let data = []
let id =1
// Add New Item to the data Structure
const addItem = (type, value, description)=>{
    item = {
        id: type + '-'+ id,
        type: type,
        description: description,
        value: value
    }
    data.push(item)
    id++;
    displayList(item)
    calculate(item)
    inputValueField.value = ""
    inputDescriptionField.value=""
}

//Display
const displayList = (item)=>{
    if (item.type==='income'){
        iconType = `<i class="fas fa-donate"></i>`
    } else if (item.type==="expense"){
        iconType=`<i class="fas fa-hand-holding-usd"></i>`
    }
    outputList = `<div class="list-individual ${item.type}-list-bg" id=${item.id}>
    <div class="list-icon">${iconType}</div>
    <div class="list-description">${item.description}</div>
    <div class="list-value"> <span>$</span> <span class="list-value-value">${item.value}</span></div>
    <div class="list-edit"><i id="deleteItem" class="edit-btn far fa-times-circle"></i></div>
    </div>`
    listContainer.insertAdjacentHTML('afterbegin', outputList)
}

let incomeTotal=0, expenseTotal=0, overallBudget=0

//Calulate 
const calculate = (calData) =>{
    if (calData.type === 'income'){
        incomeTotal = incomeTotal + calData.value
    } else if (item.type === 'expense'){
        expenseTotal = expenseTotal + calData.value
    }
    console.log('calculate single')
overallBudget = incomeTotal - expenseTotal
displayOverall(incomeTotal, expenseTotal, overallBudget)
}

const deleteDisplay = (itemID)=>{
    let el = document.getElementById(itemID);
    el.parentNode.removeChild(el);
}

const calculateAfterDelete = (calData)=>{
        incomeTotal = 0
        expenseTotal=0
        overallBudget = 0
        console.log(calData)
        calData.forEach((item)=>{
        if (item.type === 'income'){
            incomeTotal = incomeTotal + item.value
        } else if (item.type === 'expense'){
            expenseTotal = expenseTotal + item.value
        }
    })
    console.log('Calculate after delete')
    overallBudget = incomeTotal - expenseTotal
    displayOverall(incomeTotal, expenseTotal, overallBudget)
}

const incomeField = document.getElementById('overallIncomeValue')
const expenseField = document.getElementById('overallExpenseValue')
const budgetField = document.getElementById('overallBudgetValue')
const displayOverall = (income, expense, overall)=>{
    incomeField.innerHTML = `$ ${income}`
    expenseField.innerHTML = `$ ${expense}`
    budgetField.innerHTML = `$ ${overall}`
}