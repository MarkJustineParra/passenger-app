import { useState, useContext } from "react";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
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
} from "@ionic/react";
import { settingsOutline, createOutline, logOutOutline, moonOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../App";
import "./Profilepage.css";

const Profilepage: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const history = useHistory();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    setIsLoggedIn(false);           
    localStorage.removeItem("isLoggedIn"); 
    history.replace("/");             
  };

  return (
    <IonPage>
      <IonHeader translucent className="ion-no-border">
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard className="profile-card">
          <IonCardContent className="profile-card-content">
            <IonAvatar className="profile-avatar">
              <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Profile" />
            </IonAvatar>

            <h2 className="profile-name">John Doe</h2>
            <p className="profile-email">john.doe@example.com</p>

            <IonButton shape="round" fill="outline" size="small" color="dark">
              Edit Profile
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonList inset>
          <IonItem button detail={false}>
            <IonIcon icon={createOutline} slot="start" />
            <IonLabel>Edit Information</IonLabel>
          </IonItem>

          <IonItem button detail={false}>
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Account Settings</IonLabel>
          </IonItem>

          <IonItem button detail={false}>
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Dark Mode</IonLabel>
          </IonItem>

          <IonItem button detail={false} className="logout-item" onClick={handleLogout}>
            <IonIcon icon={logOutOutline} slot="start" color="danger" />
            <IonLabel color="danger">Log Out</IonLabel>
          </IonItem>
        </IonList>

        <IonModal isOpen={showLogoutModal} onDidDismiss={() => setShowLogoutModal(false)}>
          <div style={{ padding: 20, textAlign: "center" }}>
            <h2>Confirm Logout</h2>
            <IonText>Are you sure you want to log out?</IonText>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "space-around" }}>
              <IonButton color="medium" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </IonButton>
              <IonButton color="danger" onClick={confirmLogout}>
                Yes
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Profilepage;
