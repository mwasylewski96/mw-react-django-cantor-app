import { assign, createMachine, fromPromise } from "xstate";
import { toast } from "sonner";
import { fetchCurrencies } from '../api/fetchCurrenciesReq';
import { postCalculationExchange } from '../api/postCalculationReq';
import { postPayment } from '../api/postPaymentReq';
import { postTransaction } from '../api/postTransactionReq';


export const cantorMachine = createMachine({
  id: "main",
  initial: "welcomePage",
  context: {
    acceptedRules: false,

    action: "buy",
    amount: 0,
    fromCurrency: 'PLN',
    toCurrency: 'USD',

    calculatedAmount: 0,
    transactionRate: 0,
    currencies: [],

    bank: "",
    clientId: "",
    password: "",

    transactionId: "",


    error: null,
    exchangeError: true,
  },
  states: {
    welcomePage: {
      on: {
        ACCEPT: {
          actions: assign({
            acceptedRules: ({context}) => !context.acceptedRules
          })
        },
        NEXT: [
          {
            guard: ({context}) => context.acceptedRules,
            target: "currenciesApi"
          },
          {
            actions: () => toast.error("You have to accept rules!")
          }
        ]
      } 
    },
    currenciesApi: {
      invoke: {
        src: fromPromise(() => fetchCurrencies()),
        onDone: {
          actions: 'setCurrencies',
          target: 'exchangeCurrencyPage'
        },
        onError: {
          actions: 'setError',
          target: 'welcomePage'
        },
      }
    },
    exchangeCurrencyPage: {
      on: {
        ACTION: {
          actions: assign({
            action: ({event}) => event.value
          })
        },
        AMOUNT: {
          actions: assign({
            amount: ({event}) => Number(event.value)
          })
        },
        FROMCURRENCY: {
          actions: assign({
            fromCurrency: ({event}) => event.value
          })
        },
        TOCURRENCY: {
          actions: assign({
            toCurrency: ({event}) => event.value
          })
        },
        NEXT: [
        {
          guard: ({context}) => context.amount > 0 && context.fromCurrency !== context.toCurrency,
          target: 'calculatingExchangeCurrencyApi'
        },
        {
          guard: ({context}) => context.amount <= 0,
          actions: () => toast.error("Insert amount more than 0!")
        },
        {
          guard: ({context}) => context.fromCurrency === context.toCurrency,
          actions: () => toast.error("Currencies cannot be the same!")
        }
      ]
      },
    },
    calculatingExchangeCurrencyApi: {
      invoke: {
        src: fromPromise(({ input }) => {
          return postCalculationExchange(input.currency, input.action, input.amount)
        }),
        input: ({context}) => ({
            "currency": `${context.fromCurrency}/${context.toCurrency}`,
            "action": context.action,
            "amount": context.amount,
        }),
        onDone: {
          target: "exchangeCalculatorPage",
          actions: "setCalculatedAmountAndTransactionRate"
        },
        onError: {
          target: "exchangeCurrencyPage",
          actions: "setError"
        }
      }
    },
    exchangeCalculatorPage: {
      on: {
        NEXT: {
          target: "summaryChoicePage"
        },
        BACK: {
          target: "exchangeCurrencyPage"
        }
      }
    },
    summaryChoicePage: {
      on: {
        BACK: {
          target: "exchangeCalculatorPage"
        },
        NEXT: {
          target: "paymentPage"
        }
      }
    },
    paymentPage: {
      after: {
        30000: {
          target: "endPage",
          actions: () => toast.error("Transaction suspended! Session timed out!")
        }
      },
      on: {
        BANK: {
          actions: assign({
            bank: ({event}) => event.value
          })
        },
        CLIENTID: {
          actions: assign({
            clientId: ({event}) => event.value
          })
        },
        PASSWORD: {
          actions: assign({
            password: ({event}) => event.value
          })
        },
        BACK: {
          target: "summaryChoicePage"
        },
        PAY: {
          target: "paymentApi"
        }
      }
    },
    paymentApi: {
      invoke: {
        src: fromPromise(({ input }) => {
          return postPayment(input.amount, input.bank, input.id, input.password)
        }),
        input: ({context}) => ({
            "amount": context.action === "buy" ? context.calculatedAmount : context.amount,
            "bank": context.bank,
            "id": context.clientId,
            "password": context.password,
        }),
        onDone: {
          target: "transactionApi",
          actions: "setTransactionId" 
        },
        onError: {
          target: "endPage",
          actions: [
            "setError",
            "setErrorExchangeTrue"
          ]
        }
      },
    },
    transactionApi: {
      invoke: {
        src: fromPromise(({ input }) => {
          return postTransaction(input.transactionId, input.currency, input.type, input.amount);
        }),
        input: ({context}) => ({
          "transactionId": context.transactionId,
          "currency": `${context.fromCurrency}/${context.toCurrency}`,
          "type": context.action,
          "amount": context.action === "buy" ? context.calculatedAmount : context.amount,
        }),
        onDone: {
          target: "endPage",
          actions: "setErrorExchangeFalse"
        },
        onError: {
          target: "endPage",
          actions: [
            "setError",
            "setErrorExchangeTrue"
          ]
        }
      },
    },
    endPage: {
      on: {
        RESTART: {
          target: "exchangeCurrencyPage"
        }
      }
    },
  },
},
{
  actions: {
    setError: () => toast.error("Error with api! Check console logs!"),
    setCurrencies: assign({currencies: ({event}) => event.output.payload}),    
    setCalculatedAmountAndTransactionRate: assign({ 
      calculatedAmount: ({event}) => Number(event.output.payload.calculatedAmount.toFixed(2)),
      transactionRate: ({event}) => Number(event.output.payload.transactionRate)
    }),
    setTransactionId: assign({ transactionId: ({event}) => event.output.payload.transactionId}),
    setErrorExchangeTrue: assign({ exchangeError: true}),
    setErrorExchangeFalse: assign({ exchangeError: false}),
  },
});
