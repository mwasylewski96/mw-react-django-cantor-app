import { assign, createMachine, fromPromise } from "xstate";
import { toast } from "sonner";
import { fetchCurrencies } from '../api/fetchCurrenciesReq';
import { postCalculationExchange } from '../api/postCalculationReq';


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

    user: null,
    error: null,
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
          return postCalculationExchange(input.currency, input.action, input.amount)}),
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
      on: {
      }
    },
    endPage: {
      on: {
      }
    },
  },
},
{
  actions: {
    setCurrencies: assign({currencies: ({event}) => event.output.payload}),
    setError: ({ event }) => {toast.error("ERROR:", event);},
    setCalculatedAmountAndTransactionRate: assign({ 
      calculatedAmount: ({event}) => event.output.payload.calculatedAmount.toFixed(2),
      transactionRate: ({event}) => event.output.payload.transactionRate
    })
  },
});
