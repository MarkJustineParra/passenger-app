import { useState, useEffect, createContext } from "react";
import {
  IonApp,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonRouterOutlet,
  IonModal,
  IonButton,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import { scanOutline, homeSharp, personSharp } from "ionicons/icons";

import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";

setupIonicReact();

// Create context for login state
export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (val: boolean) => {},
});

const App: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load login state from localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>

            {/* Login Page */}
            <Route
              exact
              path="/"
              render={(props) =>
                isLoggedIn ? (
                  <Redirect to="/tabs/homepage" />
                ) : (
                  <LoginPage {...props} />
                )
              }
            />

            {/* SignUp Page */}
            <Route
              exact
              path="/signup"
              render={(props) =>
                isLoggedIn ? (
                  <Redirect to="/tabs/homepage" />
                ) : (
                  <SignUpPage {...props} />
                )
              }
            />

            {/* Tabs (Protected) */}
            <Route
              path="/tabs"
              render={() =>
                isLoggedIn ? (
                  <IonTabs>
                    <IonRouterOutlet>
                      <Route exact path="/tabs/homepage" component={Homepage} />
                      <Route exact path="/tabs/profilepage" component={Profilepage} />
                      <Redirect exact from="/tabs" to="/tabs/homepage" />
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                      <IonTabButton tab="homepage" href="/tabs/homepage">
                        <IonIcon icon={homeSharp} />
                      </IonTabButton>

                      <IonTabButton tab="qr" onClick={() => setShowQR(true)}>
                        <IonIcon icon={scanOutline} />
                      </IonTabButton>

                      <IonTabButton tab="profilepage" href="/tabs/profilepage">
                        <IonIcon icon={personSharp} />
                      </IonTabButton>
                    </IonTabBar>
                  </IonTabs>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </IonRouterOutlet>

          {/* QR Modal */}
          <IonModal isOpen={showQR} onDidDismiss={() => setShowQR(false)}>
            <div style={{ padding: 20 }}>
              <h2>Scan QR Code</h2>
              <IonButton onClick={() => setShowQR(false)}>Close</IonButton>
            </div>
          </IonModal>
        </IonReactRouter>
      </IonApp>
    </AuthContext.Provider>
  );
};

export default App;
