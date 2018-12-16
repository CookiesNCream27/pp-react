import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import Dialog from '@material-ui/core/Dialog';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Logger } from '../../../Utils/SharedFunctions';
import styles from './StepOneContainer.module.css';
import CreateApplication from '../CreateApplicationContainer';
import LoginFailed from '../../../assets/images/login_failed.png';

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiTypography: {
      // The properties to apply
      useNextVariants: true,
      // Use the system font instead of the default Roboto font.
      htmlFontSize: 15,
      fontWeight: '500',
    },
  },
});

const deliveryMethodData = [
  {
    value: 'NONE',
    label: 'Pilih Metode Penyerahan',
    disabled: true,
  },
  {
    value: 'TOKO',
    label: 'Diserahkan di Toko',
    disabled: false,
  },
  {
    value: 'RUMAH',
    label: 'Dikirim ke Rumah',
    disabled: false,
  },
];

class StepOne extends Component {
  state = {
    deliveryMethod: 'NONE',
    nik: '',
    isNikInvalid: true,
    reasonNikInvalid: '',
    popupShown: false,
    popupInfo: '',
  };

  handleChangeDeliveryMethod = name => event => {
    Logger(() => console.log(name));
    this.setState({
      deliveryMethod: event.target.value,
    });
  };

  handleChangeNik = name => event => {
    const regex = /^\d+$/;
    Logger(() => console.log(name, event.target.value.length));
    if (regex.test(event.target.value) || event.target.value.length === 0) {
      if (event.target.value.length <= 16) {
        this.setState({ nik: event.target.value });
      }
    }
  };

  nikLengthValidation = () => {
    const { deliveryMethod, nik } = this.state;
    Logger(() => console.log(deliveryMethod, nik, nik.length));
    if (nik.length === 16) {
      this.nikValidation();
    } else {
      this.setState({
        isNikInvalid: false,
        reasonNikInvalid: 'length_invalid',
        popupShown: true,
        popupInfo: 'NIK harus berjumlah 16 digit',
      });
    }
  };

  nikValidation = () => {
    const { deliveryMethod, nik } = this.state;

    const tanggalLahir = nik.substr(6, 2);
    const bulanLahir = nik.substr(8, 2);
    const tahunLahir = nik.substr(10, 2);
    const numTanggalLahir = parseInt(tanggalLahir, 10);
    const numBulanLahir = parseInt(bulanLahir, 10);
    const numTahunLahir = parseInt(tahunLahir, 10);

    Logger(() => console.log(deliveryMethod, numTahunLahir));
    if (
      numTanggalLahir > 0 &&
      numTanggalLahir < 32 &&
      numBulanLahir > 0 &&
      numBulanLahir < 13
    ) {
      this.ageValidation();
    } else if (
      numTanggalLahir > 40 &&
      numTanggalLahir < 72 &&
      numBulanLahir > 0 &&
      numBulanLahir < 13
    ) {
      this.ageValidation();
    } else {
      this.setState({
        isNikInvalid: false,
        reasonNikInvalid: 'format_invalid',
        popupShown: true,
        popupInfo: 'Format NIK tidak sesuai',
      });
    }
  };

  ageValidation = () => {
    const { deliveryMethod, nik } = this.state;

    let tanggalLahir = nik.substr(6, 2);
    const bulanLahir = nik.substr(8, 2);
    const tahunLahir = nik.substr(10, 2);
    const genderCheck = parseInt(tanggalLahir, 10);
    if (genderCheck > 40) {
      const a = genderCheck - 40;
      Logger(() => console.log(a));
      if (a < 10) {
        tanggalLahir = `0${a.toString()}`;
      } else {
        tanggalLahir = a.toString();
      }
    }
    const numBulanLahir = parseInt(bulanLahir, 10);
    const numTahunLahir = parseInt(tahunLahir, 10);

    const today = new Date();
    const dd = `0${today.getDate()}`.slice(-2);
    const mm = `0${today.getMonth() + 1}`.slice(-2);
    const yyyy = today.getFullYear();
    const yy = parseInt(yyyy.toString().substr(-2), 10);

    let numTahunLahirYYYY;

    if (numTahunLahir < yy) {
      numTahunLahirYYYY = parseInt(`200${numTahunLahir.toString()}`, 10);
    } else if (numTahunLahir > yy) {
      numTahunLahirYYYY = parseInt(`19${numTahunLahir.toString()}`, 10);
    } else {
      numTahunLahirYYYY = parseInt(`20${yy.toString()}`, 10);
    }

    const birthDate = `${numTahunLahirYYYY.toString()}-${bulanLahir}-${tanggalLahir}`;
    const todayDate = `${yyyy.toString()}-${mm.toString()}-${dd.toString()}`;

    const diffInMs = Date.now() - Date.parse(birthDate);
    // const diffInMs = Date.now() - Date.now();

    Logger(() => console.log(diffInMs));
    const diffInYear = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));

    Logger(() => console.log(diffInYear, birthDate, todayDate));
    Logger(() => console.log(deliveryMethod, numBulanLahir));
    if (diffInYear >= 19) {
      this.setState({
        isNikInvalid: true,
        reasonNikInvalid: '',
        popupShown: false,
        popupInfo: '',
      });
      Logger(() => console.log('berhasil'));
      this.renderRedirect();
    } else {
      this.setState({
        isNikInvalid: false,
        reasonNikInvalid: 'age_invalid',
        popupShown: true,
        popupInfo: 'Umur pelanggan harus diatas atau sama dengan 19 tahun',
      });
    }
  };

  handlePopupClose = () => {
    this.setState({
      popupShown: false,
    });
  };

  renderRedirect = () => (
    <Redirect to="./CreateApplication/StepTwo/StepTwoContainer" />
  );

  render() {
    const {
      deliveryMethod,
      nik,
      isNikInvalid,
      reasonNikInvalid,
      popupShown,
      popupInfo,
    } = this.state;
    Logger(() => console.log(deliveryMethod, nik, isNikInvalid));
    Logger(() => console.log(reasonNikInvalid, popupShown, popupInfo));
    return (
      <div>
        <div className={styles['layout-container']}>
          <div className={styles['background-first-layer']}>
            <div className={styles['background-second-layer']}>
              <div className={styles['layout-wrapper']}>
                <div className={styles['header-container']}>
                  <p className={styles['header-first-container']}>
                    <span className={styles['partner-style']}>PARTNER </span>
                    <span className={styles['portal-style']}>PORTAL</span>
                  </p>
                  <p className={styles['header-second-container']}>
                    <span className={styles['partner-style']}>By </span>
                    <span className={styles['portal-style']}>HOME CREDIT</span>
                  </p>
                </div>
                <div className={styles['title-container']}>
                  <div>
                    Data Pengajuan <br />& Kontrak
                  </div>
                </div>
                <div className={styles['step-number-container']}>
                  <p>Langkah 1</p>
                </div>
                <div className={styles['step-title-container']}>
                  <p>Informasi Pelanggan</p>
                </div>
                <div className={styles['step-detail-container']}>
                  <p>Pastikan Nomor Identitas Anda Sesuai dengan KTP</p>
                </div>
                <div className={styles['textfield-container']}>
                  <div className={styles['first-description']}>
                    Metode Penyerahan Barang
                  </div>
                  <div className={styles['first-field']}>
                    {/* Diserahkan di toko */}
                    <MuiThemeProvider theme={theme}>
                      <TextField
                        id="standard-select-currency"
                        select
                        value={deliveryMethod}
                        onChange={this.handleChangeDeliveryMethod(
                          'deliveryMethod',
                        )}
                        fullWidth
                      >
                        {deliveryMethodData.map(option => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </MuiThemeProvider>
                  </div>
                  {/* <hr /> */}
                  <div className={styles['second-description']}>
                    Data Pelanggan
                  </div>
                  <div className={styles['second-field']}>
                    <MuiThemeProvider theme={theme}>
                      <InputBase
                        placeholder="Isi NIK Sesuai KTP"
                        fullWidth
                        onChange={this.handleChangeNik('nik')}
                        onKeyUp={this.handleChangeNik('nik')}
                        maxLength="16"
                        value={nik}
                      />
                    </MuiThemeProvider>
                  </div>
                </div>
                <div
                  className={
                    deliveryMethod !== 'NONE' && nik.length !== 0
                      ? styles['submit-button-container']
                      : styles['submit-button-container-disabled']
                  }
                  onClick={
                    deliveryMethod !== 'NONE' && nik.length !== 0
                      ? this.nikLengthValidation
                      : Logger(() => console.log('disabledbutton'))
                  }
                  onKeyPress={
                    deliveryMethod !== 'NONE' && nik.length !== 0
                      ? this.nikLengthValidation
                      : Logger(() => console.log('disabledbutton'))
                  }
                  role="button"
                  tabIndex="0"
                >
                  <p>Lanjut</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CreateApplication />
        <Dialog open={popupShown} onClose={this.handlePopupClose} fullWidth>
          <div className={styles['popup-container']}>
            <div>
              <img src={LoginFailed} alt="Login Failed" />
            </div>
            <div>
              <h2 className={styles['popup-title']}>GAGAL</h2>{' '}
            </div>
            <div>
              <p className={styles['popup-description']}>{popupInfo}</p>
            </div>
            <div
              className={styles['popup-button']}
              onClick={this.handlePopupClose}
              onKeyPress={this.handlePopupClose}
              role="button"
              tabIndex="0"
            >
              <p>Coba Lagi</p>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default StepOne;
