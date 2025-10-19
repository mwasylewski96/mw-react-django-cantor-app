import React, { Component } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { createActor } from "xstate";
import { cantorMachine } from "./state_machines/cantorMachine";
import { languageMachine } from "./state_machines/languageMachine";

import Navbar from "./components/navbar";

import WelcomePage from "./pages/welcomePage";
import ExchangeCurrencyPage from "./pages/exchangeCurrencyPage";
import ExchangeCalculatorPage from "./pages/exchangeCalculatorPage";
import SummaryChoicePage from "./pages/summaryChoicePage";
import PaymentPage from "./pages/paymentPage";
import EndPage from "./pages/endPage";

class App extends Component {
  constructor(props) {
    super(props);

  
    this.actorPage = createActor(
      cantorMachine.provide({
        context: {
          toast,
      }})
    );
    this.actorLanguage = createActor(languageMachine);

    // Ustawiamy początkowy stan z snapshotów maszyn
    const pageSnapshot = this.actorPage.getSnapshot();
    const langSnapshot = this.actorLanguage.getSnapshot();

    this.state = {
      currentPage: pageSnapshot.value,
      currentLanguage: langSnapshot.value,
      context: pageSnapshot.context,
    };
  }

  componentDidMount() {
    this.pageSubscription = this.actorPage.subscribe((snapshot) => {
      const { context, value } = snapshot;
      console.log(context);

      this.setState({ context });

      if (value !== this.state.currentPage) {
        this.setState({ currentPage: value });
      }
    });

    this.languageSubscription = this.actorLanguage.subscribe((snapshot) => {
      const newLanguage = snapshot.value;
      if (newLanguage !== this.state.currentLanguage) {
        this.setState({ currentLanguage: newLanguage });
      }
    });

    this.actorPage.start();
    this.actorLanguage.start();
  }

  componentWillUnmount() {
    this.actorPage?.stop?.();
    this.actorLanguage?.stop?.();
    this.pageSubscription?.unsubscribe?.();
    this.languageSubscription?.unsubscribe?.();
  }

  send = (event, value) => {
    if (value !== undefined) {
      this.actorPage.send({ type: event, value });
    } else {
      this.actorPage.send({ type: event });
    }
  };

  sendLanguage = (event) => {
    this.actorLanguage.send({ type: event });
  };

  renderNavbar() {
    const { currentLanguage } = this.state;
    return <Navbar send={this.sendLanguage} currentLanguage={currentLanguage} />;
  }

  renderScreen() {
    const { currentPage, currentLanguage, context } = this.state;

    const pages = {
      welcomePage: <WelcomePage send={this.send} currentLanguage={currentLanguage} />,
      exchangeCurrencyPage: (
        <ExchangeCurrencyPage send={this.send} context={context} currentLanguage={currentLanguage} />
      ),
      exchangeCalculatorPage: (
        <ExchangeCalculatorPage send={this.send} context={context} currentLanguage={currentLanguage} />
      ),
      summaryChoicePage: (
        <SummaryChoicePage send={this.send} context={context} currentLanguage={currentLanguage} />
      ),
      paymentPage: (
        <PaymentPage send={this.send} context={context} currentLanguage={currentLanguage} />
      ),
      endPage: <EndPage send={this.send} context={context} currentLanguage={currentLanguage} />,
    };

    return pages[currentPage] || <WelcomePage send={this.send} currentLanguage={currentLanguage} />;
  }

  render() {
    return (
      <div>
        <Toaster
          richColors
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: "my-toast-style",
            duration: 3500,
          }}
        />
        {this.renderNavbar()}
        {this.renderScreen()}
      </div>
    );
  }
}

export default App;
