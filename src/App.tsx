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
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, useLocation } from "react-router-dom";
import {
  scanOutline,
  homeSharp,
  personSharp,
  closeOutline,
  chevronDownOutline,
  busOutline,
} from "ionicons/icons";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { Capacitor } from "@capacitor/core";
import { LoadingProvider } from "./contexts/LoadingContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { getPlatformClasses } from "./utils/platform";

import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";
import EditProfile from "./pages/EditProfile";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import WalletPage from "./pages/WalletPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import DiscountPage from "./pages/DiscountPage";
import WelcomePage from "./pages/WelcomePage";
import MobileSignupPage from "./pages/MobileSignupPage";
import NotificationPage from "./pages/NotificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Addresspage from "./pages/Addresspage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import SecurityPage from "./pages/SecurityPage";
import HelpPage from "./pages/HelpPage";
import AccountDeletionPage from "./pages/AccountDeletionPage";
import AboutPage from "./pages/AboutPage";




import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/palettes/dark.class.css";
import "./theme/variables.css";
import "./styles/common.css";
import "./styles/base.css";
import "./styles/responsive.css";
import "./styles/platform.css";
import "./theme/tabs.css";
import "./theme/sheet.css";
import "./theme/qr-scanner.css";

setupIonicReact({
  mode: 'ios',
  swipeBackEnabled: true,
});

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (_: boolean) => {},
});

const openNearbyEvent = () => window.dispatchEvent(new Event("open-nearby"));
const TabsLayout: React.FC<{
  isLoggedIn: boolean;
  setOpenQRSheet: (v: boolean) => void;
}> = ({ isLoggedIn, setOpenQRSheet }) => {
  const location = useLocation();
  const hideBottomBar = false;
  if (!isLoggedIn) return <Redirect to="/" />;

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/homepage" component={Homepage} />
        <Route exact path="/tabs/profilepage" component={Profilepage} />
        <Redirect exact from="/tabs" to="/tabs/homepage" />
      </IonRouterOutlet>

      {!hideBottomBar && (
        <div className="tabbar-wrapper">
          <IonTabBar slot="bottom" className="main-tabbar">
            <IonTabButton tab="home" href="/tabs/homepage">
              <IonIcon icon={homeSharp} />
            </IonTabButton>

            <IonTabButton className="tab-spacer" />

            <IonTabButton tab="profile" href="/tabs/profilepage">
              <IonIcon icon={personSharp} />
            </IonTabButton>
          </IonTabBar>

          <button className="qr-button" onClick={() => setOpenQRSheet(true)}>
            <IonIcon icon={scanOutline} />
          </button>
        </div>
      )}
    </IonTabs>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openNearbySheet, setOpenNearbySheet] = useState(false);
  const [openQRSheet, setOpenQRSheet] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setShowWelcome(true);

    
    const platformClasses = getPlatformClasses();
    document.body.className = platformClasses;

    
    const handleOrientationChange = () => {
      const newClasses = getPlatformClasses();
      document.body.className = newClasses;
    };

    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);
  useEffect(() => {
    const handler = () => {
      console.log('Received open-nearby event, opening sheet');
      setOpenNearbySheet(true);
    };
    window.addEventListener("open-nearby", handler);
    return () => window.removeEventListener("open-nearby", handler);
  }, []);

  const startQrScan = async () => {
    if (!Capacitor.isNativePlatform()) {
      alert("QR scanning works only on a real device");
      return;
    }

    const permission = await BarcodeScanner.requestPermissions();
    if (permission.camera !== "granted") {
      alert("Camera permission denied");
      return;
    }

    document.body.classList.add("scanner-active");
    const result = await BarcodeScanner.scan({});

    if (result.barcodes.length > 0) {
      const value = result.barcodes[0].rawValue;

      stopQrScan();
      setOpenQRSheet(false);

      alert(`Scanned QR:\n${value}`);
    }
  };

  const stopQrScan = async () => {
    await BarcodeScanner.stopScan();
    document.body.classList.remove("scanner-active");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <IonApp>
        <IonReactRouter>
          <LoadingProvider>
            <IonRouterOutlet>
            <Route
              exact
              path="/"
              render={() => {
                
                if (showWelcome) return <WelcomePage />;
                if (isLoggedIn) return <Redirect to="/tabs/homepage" />;
                return <Redirect to="/login" />;
              }}
            />

            <Route exact path="/welcome" component={WelcomePage} />

            <Route
              exact
              path="/login"
              component={LoginPage}
            />

            <Route
              exact
              path="/signup"
              render={() =>
                isLoggedIn ? (
                  <Redirect to="/tabs/homepage" />
                ) : (
                  <MobileSignupPage />
                )
              }
            />

            <Route
              exact
              path="/edit-profile"
              render={() => (isLoggedIn ? <DarkModeProvider><EditProfile /></DarkModeProvider> : <Redirect to="/" />)}
            />
            <Route
              exact
              path="/settings"
              render={() => (isLoggedIn ? <DarkModeProvider><SettingsPage /></DarkModeProvider> : <Redirect to="/" />)}
            />
            <Route
              exact
              path="/wallet"
              render={() => (isLoggedIn ? <DarkModeProvider><WalletPage /></DarkModeProvider> : <Redirect to="/" />)}
            />
            <Route
              exact
              path="/discount"
              render={() => (isLoggedIn ? <DarkModeProvider><DiscountPage /></DarkModeProvider> : <Redirect to="/" />)}
            />
            <Route
              exact
              path="/change-password"
              render={() =>
                isLoggedIn ? <DarkModeProvider><ChangePasswordPage /></DarkModeProvider> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/notifications"
              render={() =>
                isLoggedIn ? <DarkModeProvider><NotificationPage /></DarkModeProvider> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/address"
              render={() =>
                isLoggedIn ? <DarkModeProvider><Addresspage /></DarkModeProvider> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/privacy-policy"
              render={() =>
                isLoggedIn ? <DarkModeProvider><PrivacyPolicyPage /></DarkModeProvider> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/security"
              render={() =>
                isLoggedIn ? <DarkModeProvider><SecurityPage /></DarkModeProvider> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/help"
              render={() =>
                isLoggedIn ? <DarkModeProvider><HelpPage /></DarkModeProvider> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/account-deletion"
              render={() =>
                isLoggedIn ? <DarkModeProvider><AccountDeletionPage /></DarkModeProvider> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/about"
              render={() =>
                isLoggedIn ? <DarkModeProvider><AboutPage /></DarkModeProvider> : <Redirect to="/" />
              }
            />
            <Route exact path="/forgot-password" component={ForgotPasswordPage} />

            <Route
              path="/tabs"
              render={() => (
                <DarkModeProvider>
                  <TabsLayout
                    isLoggedIn={isLoggedIn}
                    setOpenQRSheet={setOpenQRSheet}
                  />
                </DarkModeProvider>
              )}
            />
          </IonRouterOutlet>

          <IonModal
            isOpen={openQRSheet}
            onDidDismiss={() => {
              stopQrScan();
              setOpenQRSheet(false);
            }}
            className="qr-scanner-modal"
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>Scan QR Code</IonTitle>
                <IonButton
                  fill="clear"
                  slot="end"
                  onClick={() => {
                    stopQrScan();
                    setOpenQRSheet(false);
                  }}
                >
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="qr-scanner-content">
              <div className="scanner-stage">
                <div className="scanner-hint">Point camera at QR code</div>

                <div className="scanner-frame">
                  <div className="scan-line" />
                  <span className="corner tl" />
                  <span className="corner tr" />
                  <span className="corner bl" />
                  <span className="corner br" />
                </div>

                <IonButton
                  expand="block"
                  className="scanner-action"
                  onClick={startQrScan}
                >
                  Start Scanning
                </IonButton>
              </div>
            </IonContent>
          </IonModal>

          <IonModal
            isOpen={openNearbySheet}
            onDidDismiss={() => setOpenNearbySheet(false)}
            initialBreakpoint={0.45}
            breakpoints={[0, 0.45, 0.75, 1]}
            className="nearby-sheet"
          >
            <IonContent className="nearby-content" scrollY={false}>
              <div className="nearby-header">
                <div className="nearby-title">Nearby Buses</div>

                <button
                  className="nearby-close"
                  onClick={() => setOpenNearbySheet(false)}
                  type="button"
                  aria-label="Close"
                >
                  <IonIcon icon={chevronDownOutline} />
                </button>
              </div>

              <div className="nearby-list">
                <div className="nearby-row">
                  <div className="nearby-left">
                    <div className="nearby-icon">
                      <IonIcon icon={busOutline} />
                    </div>

                    <div className="nearby-info">
                      <div className="nearby-busname">Bus123</div>
                      <div className="nearby-route">Earth - Venus</div>
                    </div>
                  </div>

                  <div className="nearby-eta">2mins</div>
                </div>

                <div className="nearby-row">
                  <div className="nearby-left">
                    <div className="nearby-icon">
                      <IonIcon icon={busOutline} />
                    </div>

                    <div className="nearby-info">
                      <div className="nearby-busname">Bus789</div>
                      <div className="nearby-route">Uranus - Mercury</div>
                    </div>
                  </div>

                  <div className="nearby-eta">10mins</div>
                </div>
              </div>
            </IonContent>
          </IonModal>
          </LoadingProvider>
        </IonReactRouter>
      </IonApp>
    </AuthContext.Provider>
  );
};

export default App;
export { openNearbyEvent };
