const Modal = {
  open() {
    // Abrir Modal
    // Adicionar a class active ao Modal
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    // Fechar o Modal
    // Removar a class active do Modal
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -50001,
    date: "23/01/2021",
  },
  {
    id: 2,
    description: "Criação Website",
    amount: 500000,
    date: "23/01/2021",
  },
  {
    id: 3,
    description: "Internet",
    amount: -20012,
    date: "23/01/2021",
  },
  {
    id: 4,
    description: "App",
    amount: 200000,
    date: "23/01/2021",
  },
];

const Transaction = {
  incomes() {
    let income = 0
    //pegar todas as Transações
    //para cada transação,
    transactions.forEach(transaction => {
      // se ela for maior que ZERO
      if(transaction.amount > 0) {
        //somar a uma variável e retornar a variável
        income += transaction.amount
      }
    })
    return income
  },
  expenses() {
    let expense = 0
    //pegar todas as Transações
    //para cada transação,
    transactions.forEach(transaction => {
      // se ela for menor que ZERO
      if(transaction.amount < 0) {
        //subtrair a uma variável e retornar a variável
        expense += transaction.amount
      }
    })
    return expense
  },
  total() {
    return Transaction.incomes() + Transaction.expenses()
  },
};

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : 'expense'
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
              <td class="descriptio">${transaction.description}</td>
              <td class="${CSSclass}">${amount}</td>
              <td class="date">${transaction.date}</td>
              <td>
                <img src="./assets/minus.svg" alt="Imagem remover transaçnao" />
              </td>
        `
        return html
  },

  updateBalance() {
    document.querySelector('#incomeDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.incomes())
    
    document.querySelector('#expenseDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.expenses())
    
    document.querySelector('#totalDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.total())
  }
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ''
    value = String(value).replace(/\D/g, '')
    value = Number(value) / 100
    value = value.toLocaleString('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    })

    return signal + value
  }
}

transactions.forEach(function(transaction) {
  DOM.addTransaction(transaction)

})

DOM.updateBalance()