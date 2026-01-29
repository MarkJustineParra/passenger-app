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
            <img src="/welcomelogo.png" alt="iKomyutPH Logo" />
          </div>
          <div className="welcome-text">
            <span className="letter">i</span>
            <span className="letter">K</span>
            <span className="letter">o</span>
            <span className="letter">m</span>
            <span className="letter">y</span>
            <span className="letter">u</span>
            <span className="letter">t</span>
            <span className="letter red-letter">P</span>
            <span className="letter red-letter">H</span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
