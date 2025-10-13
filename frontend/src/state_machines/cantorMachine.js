import { assign, createMachine } from "xstate";
import { toast } from "sonner";

export const cantorMachine = createMachine({
  id: "main",
  initial: "welcomePage",
  context: {
    acceptedRules: false,

    action: "buy",
    amount: 0,
    fromCurrency: 'PLN',
    toCurrency: 'USD',

    calculatedAmount: 0
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
            target: "exchangeCurrencyPage"
          },
          {
            actions: () => toast.error("You have to accept rules!")
          }
        ]
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
          target: 'exchangeCalculatorPage'
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
    exchangeCalculatorPage: {
      entry: assign({
            calculatedAmount: ({context}) => context.amount*4.00
          }),
      on: {
        CALCULATEDAMOUNT: {
          actions: assign({
            calculatedAmount: ({event}) => event.value
          })
        },
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
});
