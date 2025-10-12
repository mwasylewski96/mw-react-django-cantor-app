import { createMachine } from "xstate";

export const languageMachine = createMachine({
    id: "language",
    initial: "pl",
    states: {
        pl: {
            on: {
                ENG: {
                    target: "eng"
            }
        }},
        eng: {
            on: {
                PL: {
                    target: "pl"
            }
        }},
    }
})