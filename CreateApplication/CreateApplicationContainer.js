import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingContainer from '../Loading/LoadingContainer';
import styles from './CreateApplicationContainer.module.css';
import IconFacebook from '../../assets/images/facebook.png';
import IconInstagram from '../../assets/images/instagram.png';
import IconTwitter from '../../assets/images/twitter.png';
import IconLinkedIn from '../../assets/images/linkdin.png';
import IconYoutube from '../../assets/images/youtube.png';
import IconMail from '../../assets/images/mail_black.png';
import IconCall from '../../assets/images/call_footer.png';
import LogoOJK from '../../assets/images/Logo_OJK.png';
import IconBeranda from '../../assets/images/icon-beranda.png';
import IconKontrak from '../../assets/images/icon-kontrak.png';
import IconProfil from '../../assets/images/icon-profil.png';

const StepOne = React.lazy(() => import('./StepOne/StepOneContainer'));
const StepTwo = React.lazy(() => import('./StepTwo/StepTwoContainer'));
const StepThree = React.lazy(() => import('./StepThree/StepThreeContainer'));

class CreateApplication extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<LoadingContainer />}>
          <div>
            <Route
              exact
              path="/stepone"
              defaultRoute="true"
              component={props => <StepOne {...props} />}
            />
            <Route
              exact
              path="/steptwo"
              component={props => <StepTwo {...props} />}
            />
            <Route
              exact
              path="/stepthree"
              component={props => <StepThree {...props} />}
            />
            {/*  IGNORE THIS */}
            <Route
              path="/testing-component"
              component={() => <LoadingContainer />}
            />
            {/* CONTAINER COMPONENT TESTING PURPOSES */}
            <div className={styles['layout-wrapper']}>
              <div className={styles['footer-container']}>
                <div className={styles['socmed-container']}>
                  <a
                    href="https://www.facebook.com/homecreditid/"
                    className={styles['socmed-icon-facebook']}
                  >
                    <img src={IconFacebook} alt="icon-facebook" />
                  </a>
                  <a
                    href="https://www.instagram.com/homecreditid/"
                    className={styles['socmed-icon-instagram']}
                  >
                    <img src={IconInstagram} alt="icon-instagram" />
                  </a>
                  <a
                    href="https://twitter.com/homecreditid_"
                    className={styles['socmed-icon-twitter']}
                  >
                    <img src={IconTwitter} alt="icon-twitter" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/homecreditindonesia"
                    className={styles['socmed-icon-linkedin']}
                  >
                    <img src={IconLinkedIn} alt="icon-linkedin" />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCbFe7opCDSZ3sKLV42MtCfA"
                    className={styles['socmed-icon-youtube']}
                  >
                    <img src={IconYoutube} alt="icon-youtube" />
                  </a>
                </div>
                <div className={styles['email-container']}>
                  <img
                    src={IconMail}
                    alt="IconMail"
                    className={styles['icon-email']}
                  />
                  <a href="mailto:partner.helpline@homecredit.co.id">
                    <small>partner.helpline@homecredit.co.id</small>
                  </a>
                </div>
                <div className={styles['phone-container']}>
                  <img
                    src={IconCall}
                    alt="icon-phone"
                    className={styles['icon-phone']}
                  />
                  <a href="tel:+622180625533">
                    <small>(021) 8062-5533</small>
                  </a>
                </div>
                <div className={styles['ojk-logo-container']}>
                  <img
                    src={LogoOJK}
                    alt="logo-ojk"
                    className={styles['footer-right-icon']}
                  />
                </div>
              </div>
            </div>
            <div className={styles['navbar-container']}>
              <div className={styles['button-container']}>
                <img
                  src={IconBeranda}
                  alt="icon-beranda"
                  className={styles['icon-beranda']}
                />
                <br />
                <p>Beranda</p>
              </div>
              <div className={styles['button-container']}>
                <img
                  src={IconKontrak}
                  alt="icon-kontrak"
                  className={styles['icon-kontrak']}
                />
                <br />
                <p className={styles['active-menu']}>Kontrak Baru</p>
              </div>
              <div className={styles['button-container']}>
                <img
                  src={IconProfil}
                  alt="icon-profil"
                  className={styles['icon-profil']}
                />
                <br />
                <p>Profil</p>
              </div>
            </div>
          </div>
        </Suspense>
      </Router>
    );
  }
}

export default CreateApplication;
