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

const Transaction = {
  all: [
    {
      description: "Luz",
      amount: -50001,
      date: "23/01/2021",
    },
    {
      description: "Criação Website",
      amount: 500000,
      date: "23/01/2021",
    },
    {
      description: "Internet",
      amount: -20012,
      date: "23/01/2021",
    },
    {
      description: "App",
      amount: 200000,
      date: "23/01/2021",
    },
  ],

  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
  },

  incomes() {
    let income = 0;
    //pegar todas as Transações
    //para cada transação,
    Transaction.all.forEach((transaction) => {
      // se ela for maior que ZERO
      if (transaction.amount > 0) {
        //somar a uma variável e retornar a variável
        income += transaction.amount;
      }
    });
    return income;
  },

  expenses() {
    let expense = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
              <td class="descriptio">${transaction.description}</td>
              <td class="${CSSclass}">${amount}</td>
              <td class="date">${transaction.date}</td>
              <td>
                <img src="./assets/minus.svg" alt="Imagem remover transaçnao" />
              </td>
        `;
    return html;
  },

  updateBalance() {
    document.querySelector("#incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );

    document.querySelector("#expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );

    document.querySelector("#totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  formateAmount(value) {
    value = Number(value) * 100
    
    return value
  },

  formateDate(date) {
    const splittedDate = date.split('-')
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    console.log(splittedDate)
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";
    value = String(value).replace(/\D/g, "");
    value = Number(value) / 100;
    value = value.toLocaleString("PT", {
      style: "currency",
      currency: "EUR",
    });

    return signal + value;
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFilds() {
    const { description, amount, date } = Form.getValues()
    if(description.trim() === '' || amount.trim() === '' || date.trim() === '') {
      throw new Error('Prencha todos os campos')
    }
  },

  formateValues(value) {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formateAmount(amount)

    date = Utils.formateDate(date)

    return {
      description,
      amount,
      date
    }
  },


  submit(event) {
    event.preventDefault();

    try {
      // verificar se todas as informações foram preenchidas
    // Form.validateFilds();
    // formatar os dados para salvar
    Form.formateValues()
    // salvar
    // apagar os dados do formulário
    // modal feche
    // atualizar a aplicação
    } catch (error) {
      alert(error.message)
    }

    
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction) => {
      DOM.addTransaction(transaction);
    });

    DOM.updateBalance();
  },

  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();
