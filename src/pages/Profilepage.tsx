import { useState, useContext } from "react";
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonText,
  IonButton,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import {
  personOutline,
  lockClosedOutline,
  settingsOutline,
  walletOutline,
  logOutOutline,
  chevronForwardOutline,
  pricetagOutline,
} from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import { AuthContext } from "../App";
import "../styles/Profilepage.css";

const Profilepage: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const ionRouter = useIonRouter();
  const { setIsLoggedIn } = useContext(AuthContext);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    ionRouter.push("/", "root");
  };

  return (
    <IonPage>
      <IonHeader className="profile-header-bar">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/tabs/homepage" />
          </IonButtons>

          <IonTitle className="profile-title">My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={false} className="profile-content">
        <div className="profile-header">
          <IonAvatar className="profile-avatar">
            <img
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
              alt="Profile"
            />
          </IonAvatar>
          <h2 className="profile-name">Mark Parra</h2>
          <p className="profile-number">09123456789</p>
        </div>

        <IonList inset className="profile-list">
          <IonItem lines="none" button onClick={() => ionRouter.push("/edit-profile")}>
            <IonIcon icon={personOutline} slot="start" />
            <IonLabel>Edit Profile</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem lines="none" button onClick={() => ionRouter.push("/discount")}>
            <IonIcon icon={pricetagOutline} slot="start" />
            <IonLabel>Discount</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem lines="none" button onClick={() => ionRouter.push("/change-password")}>
            <IonIcon icon={lockClosedOutline} slot="start" />
            <IonLabel>Change Password</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem lines="none" button onClick={() => ionRouter.push("/settings")}>
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Settings</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem lines="none" button onClick={() => ionRouter.push("/wallet")}>
            <IonIcon icon={walletOutline} slot="start" />
            <IonLabel>Wallet</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem lines="none" button onClick={() => setShowLogoutModal(true)}>
            <IonIcon icon={logOutOutline} slot="start" color="danger" />
            <IonLabel color="danger">Log Out</IonLabel>
          </IonItem>
        </IonList>

        <IonModal
          isOpen={showLogoutModal}
          onDidDismiss={() => setShowLogoutModal(false)}
          className="logout-modal-sheet"
        >
          <div className="logout-sheet">
            <div className="logout-handle" />

            <h2 className="logout-title">Log out?</h2>
            <IonText className="logout-sub">
              You’ll need to log in again to access your account.
            </IonText>

            <div className="logout-actions">
              <IonButton
                expand="block"
                fill="outline"
                className="logout-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </IonButton>

              <IonButton
                expand="block"
                color="danger"
                className="logout-confirm"
                onClick={confirmLogout}
              >
                Yes, Log Out
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Profilepage;
