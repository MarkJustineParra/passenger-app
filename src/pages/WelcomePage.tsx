import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import "../styles/WelcomePage.css";

const WelcomePage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="welcome-content">
        <div className="welcome-container">
          <div className="welcome-logo">
            <img src="/logo4.png" alt="iKomyutPH Logo" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
