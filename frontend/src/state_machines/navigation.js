import { createMachine } from "xstate";

export const navigationMachine = createMachine({
  id: "navigation",
  initial: "page1",
  states: {
    page1: { on: { NEXT: "page2" } },
    page2: { on: { NEXT: "page3", PREV: "page1" } },
    page3: { on: { NEXT: "page4", PREV: "page2" } },
    page4: { on: { NEXT: "page5", PREV: "page3" } },
    page5: { on: { NEXT: "page6", PREV: "page4" } },
    page6: { on: { PREV: "page5", RESET: "page1" } },
  },
});
