import { IonPage, IonContent } from "@ionic/react";
import { ReactNode, useEffect } from "react";

interface AuthPageLayoutProps {
  children: ReactNode;
  className?: string;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children, className = "" }) => {
  useEffect(() => {
    document.documentElement.classList.remove("ion-palette-dark");
  }, []);

  return (
    <IonPage className="auth-force-light-page">
      <IonContent fullscreen className={`auth-page-content auth-force-light ${className}`} scrollY={true}>
        <div className="auth-page-container">
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthPageLayout;
