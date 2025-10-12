import { assign, createMachine } from "xstate";
import { toast } from "sonner";

export const cantorMachine = createMachine({
  id: "main",
  initial: "welcomePage",
  context: {
    acceptedRules: false,
  },
  states: {
    welcomePage: {
      on: {
        ACCEPT: {
          actions: assign({
            acceptedRules: () => true
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
      }
    },
    exchangeCalculatorPage: {
      on: {
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
