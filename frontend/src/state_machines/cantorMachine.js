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
            amount: ({event}) => event.value
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
          guard: ({context}) => context.amount > 0,
          target: 'exchangeCalculatorPage'
        },
        {
          actions: () => toast.error("Insert amount more than 0!")
        }
      ]
      },
    },
    exchangeCalculatorPage: {
      on: {
        BACK: {
          target: "exchangeCurrencyPage"
        }
      }
    },
    summaryChoicePage: {
      on: {
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
