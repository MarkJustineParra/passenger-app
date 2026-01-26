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
  IonList,
  IonItem,
  IonLabel,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import { scanOutline, homeSharp, personSharp, closeOutline } from "ionicons/icons";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { Capacitor } from "@capacitor/core";
import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";
import EditProfile from "./pages/EditProfile";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import "./theme/tabs.css";
import "./theme/sheet.css";
import "./theme/qr-scanner.css";

setupIonicReact();


export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (_: boolean) => {},
});


const openNearbyEvent = () => window.dispatchEvent(new Event("open-nearby"));

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openNearbySheet, setOpenNearbySheet] = useState(false);
  const [openQRSheet, setOpenQRSheet] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  
  useEffect(() => {
    const handler = () => setOpenNearbySheet(true);
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

    const result = await BarcodeScanner.scan({
      formats: ["QR_CODE"],
    });

    if (result.barcodes.length > 0) {
      const value = result.barcodes[0].rawValue;
      console.log("QR scanned:", value);

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
          <IonRouterOutlet>
            <Route exact path="/" render={() => (isLoggedIn ? <Redirect to="/tabs/homepage" /> : <LoginPage />)} />
            <Route exact path="/signup" render={() => (isLoggedIn ? <Redirect to="/tabs/homepage" /> : <SignUpPage />)} />
            <Route exact path="/edit-profile" render={() => (isLoggedIn ? <EditProfile /> : <Redirect to="/" />)} />
            <Route exact path="/settings" render={() => (isLoggedIn ? <SettingsPage /> : <Redirect to="/" />)} />

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
                  </IonTabs>
                ) : (
                  <Redirect to="/" />
                )
              }
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
                <IonButton fill="clear" slot="end" onClick={() => { stopQrScan(); setOpenQRSheet(false); }}>
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

                <IonButton expand="block" className="scanner-action" onClick={startQrScan}>
                  Start Scanning
                </IonButton>
              </div>
            </IonContent>
          </IonModal>

          
          <IonModal
            isOpen={openNearbySheet}
            onDidDismiss={() => setOpenNearbySheet(false)}
            initialBreakpoint={0.35}
            breakpoints={[0, 0.35, 0.6, 0.9]}
            handleBehavior="cycle"
            className="nearby-sheet"
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>Nearby Buses</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent>
              <IonList>
                <IonItem><IonLabel><h2>Bus 1</h2><p>~ 0.3 km away</p></IonLabel></IonItem>
                <IonItem><IonLabel><h2>Bus 2</h2><p>~ 0.7 km away</p></IonLabel></IonItem>
                <IonItem><IonLabel><h2>Bus 3</h2><p>~ 1.2 km away</p></IonLabel></IonItem>
              </IonList>
            </IonContent>
          </IonModal>
        </IonReactRouter>
      </IonApp>
    </AuthContext.Provider>
  );
};

export default App;
export { openNearbyEvent };
