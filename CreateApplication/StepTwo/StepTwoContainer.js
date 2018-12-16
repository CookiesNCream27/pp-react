import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Logger } from '../../../Utils/SharedFunctions';
import styles from './StepTwoContainer.module.css';
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

const MyComponent = props => {
  console.log(props);
  const { id, commodityCategory } = props;
  const { commodityType, brand } = props;
  const { model, price } = props;
  return (
    <div className={styles['textfield-container']}>
      <div className={styles['first-description']}>Data Produk</div>
      <div className={styles['first-field']}>
        <MuiThemeProvider theme={theme}>
          <TextField
            id="commodityCategory"
            select
            value={commodityCategory}
            // onChange={props.handleChangeCommodityCategory(
            //   id,
            //   commodityCategory,
            // )}
            fullWidth
          >
            {dataCommodityCategory.map(option => (
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
      <div className={styles['first-description']} />
      <div className={styles['first-field']}>
        <MuiThemeProvider theme={theme}>
          <TextField
            id="commodityType"
            select
            value={commodityType}
            // onChange={handleChangeCommodityType('commodityType')}
            fullWidth
            disabled={commodityCategory === 'NONE'}
          >
            {dataCommodityType.map(option => (
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
      <div className={styles['first-description']} />
      <div className={styles['first-field']}>
        <MuiThemeProvider theme={theme}>
          <TextField
            id="brand"
            select
            value={brand}
            // onChange={handleChangeBrand('brand')}
            fullWidth
          >
            {dataBrand.map(option => (
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
      <div className={styles['model-description']} />
      <div className={styles['second-field']}>
        <MuiThemeProvider theme={theme}>
          <InputBase
            id="model"
            placeholder="Isi Model Barang"
            fullWidth
            // onChange={handleChangeModel('model')}
            // onKeyUp={handleChangeModel('model')}
            value={model}
          />
        </MuiThemeProvider>
      </div>
      <div className={styles['second-description']}>Harga Barang</div>
      <div className={styles['second-field']}>
        <MuiThemeProvider theme={theme}>
          <NumberFormat
            customInput={InputBase}
            thousandSeparator
            fullWidth
            placeholder="Isi Harga Barang"
            startAdornment={
              <InputAdornment position="start">Rp</InputAdornment>
            }
            // onValueChange={handleValueChangePrice}
            value={price}
            isNumericString
          />
        </MuiThemeProvider>
      </div>
    </div>
  );
};

MyComponent.defaultProps = {
  id: PropTypes.string,
  commodityCategory: PropTypes.string,
  commodityType: PropTypes.string,
  brand: PropTypes.string,
  model: PropTypes.string,
  price: PropTypes.string,
};

MyComponent.propTypes = {
  id: PropTypes.string,
  commodityCategory: PropTypes.string,
  commodityType: PropTypes.string,
  brand: PropTypes.string,
  model: PropTypes.string,
  price: PropTypes.string,
};

let dataProduct = [
  {
    id: 1,
    commodityCategory: 'NONE',
    commodityType: 'NONE',
    brand: 'NONE',
    model: '',
    price: '',
    total: '',
  },
  {
    id: 2,
    commodityCategory: 'NONE',
    commodityType: 'NONE',
    brand: 'NONE',
    model: '',
    price: '',
    total: '',
  },
];

const dataCommodityCategory = [
  {
    value: 'NONE',
    label: 'Pilih Jenis Produk',
    disabled: true,
  },
  // {
  //   value: 'ELEKTRONIK',
  //   label: 'Barang Elektronik',
  // },
  // {
  //   value: 'FASHION',
  //   label: 'Fashion',
  // },
  // {
  //   value: 'FURNITURE',
  //   label: 'Furniture/Mebel',
  // },
  // {
  //   value: 'GADGET',
  //   label: 'Gadget',
  // },
  // {
  //   value: 'TV',
  //   label: 'LCD TV / LED TV / Plasma TV',
  // },
  // {
  //   value: 'LAPTOP',
  //   label: 'Laptop / Komputer',
  // },
  {
    value: 'HANDPHONE',
    label: 'Handphone / Smartphone',
    disabled: false,
  },
  // {
  //   value: 'HP2',
  //   label: 'Handphone / Smartphone / Tablet',
  // },
];

const dataCommodityType = [
  {
    value: 'NONE',
    label: 'Pilih Tipe Barang',
    disabled: true,
  },
  {
    value: 'HPPROMO',
    label: 'Smartphone Promo',
  },
];

const dataBrand = [
  {
    value: 'NONE',
    label: 'Pilih Merk',
    disabled: true,
  },
  {
    value: 'LENOVO',
    label: 'LENOVO',
  },
];

class StepTwo extends Component {
  constructor() {
    super();
    this.state = {
      popupShown: false,
      popupInfo: '',
    };
  }
  // state = {
  //   commodityCategory: 'NONE',
  //   commodityType: 'NONE',
  //   brand: 'NONE',
  //   model: '',
  //   price: '',
  //   total: '',
  //   popupShown: false,
  //   popupInfo: '',
  // };

  handleChangeCommodityCategory = (name, id) => event => {
    Logger(() => console.log(name, id, dataProduct));
    // this.setState({
    //   commodityCategory: event.target.value,
    // });
    dataProduct[id - 1].commodityCategory = event.target.value;
  };

  // handleChangeCommodityCategory = (id, value) => {
  //   Logger(() => console.log(id, value, dataProduct));
  //   // this.setState({
  //   //   commodityCategory: event.target.value,
  //   // });
  //   // dataProduct[id - 1].commodityCategory = value;
  // };

  handleChangeCommodityType = (name, id) => event => {
    Logger(() => console.log(name));
    // this.setState({
    //   commodityType: event.target.value,
    // });
    dataProduct[id - 1].commodityType = event.target.value;
  };

  handleChangeBrand = (name, id) => event => {
    Logger(() => console.log(name));
    // this.setState({
    //   brand: event.target.value,
    // });
    dataProduct[id - 1].brand = event.target.value;
  };

  handleChangeModel = (name, id) => event => {
    Logger(() => console.log(name));
    // this.setState({
    //   model: event.target.value,
    // });
    dataProduct[id - 1].model = event.target.value;
  };

  handleValueChangePrice = values => {
    Logger(() => console.log(values.value));
    this.setState({
      price: values.value,
    });
  };

  handleValueChangeTotal = values => {
    Logger(() => console.log(values.value));
    this.setState({
      total: values.value,
    });
  };

  validatePrice = () => {
    const {
      commodityCategory,
      commodityType,
      brand,
      model,
      price,
      total,
    } = dataProduct;
    Logger(() => console.log(commodityCategory, commodityType));
    Logger(() => console.log(brand, model));
    if (total >= price) {
      this.setState({
        popupShown: true,
        popupInfo:
          'Total Pembayaran Tunai tidak boleh lebih besar dari harga barang',
      });
    } else {
      console.log('berhasil');
      this.setState({
        popupShown: false,
        popupInfo: '',
      });
    }
  };

  handlePopupClose = () => {
    this.setState({
      popupShown: false,
    });
  };

  addDataProduct = () => {
    const arrayLength = dataProduct.length;
    const newId = dataProduct[arrayLength - 1].id + 1;
    const newData = {
      id: newId,
      commodityCategory: 'NONE',
      commodityType: 'NONE',
      brand: 'NONE',
      model: '',
      price: '',
      total: '',
    };
    dataProduct.push(newData);
    Logger(() => console.log(dataProduct));
  };

  // checkAddProduct = () => {
  //   for (let i = 0; i < dataProduct; i++) {
  //     if (
  //       dataProduct[i].commodityCategory !== 'NONE' &&
  //       dataProduct[i].commodityType !== 'NONE' &&
  //       dataProduct[i].brand !== 'NONE'
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // };

  render() {
    // const {
    //   commodityCategory,
    //   commodityType,
    //   brand,
    //   model,
    //   price,
    //   total,
    // } = dataProduct[0];
    const { popupShown, popupInfo } = this.state;
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
                  <p>Langkah 2</p>
                </div>
                <div className={styles['step-title-container']}>
                  <p>Informasi Pengajuan</p>
                </div>
                <div className={styles['step-detail-container']}>
                  <p>Masukan Informasi Barang yang Anda inginkan</p>
                </div>
                {/* {dataProduct.map(data => {
                  return (
                    <MyComponent
                      key={data.id}
                      commodityCategory={data.commodityCategory}
                      commodityType={data.commodityType}
                      brand={data.brand}
                      model={data.model}
                      price={data.price}
                    />
                  );
                })} */}
                {dataProduct.map(data => (
                  <div className={styles['textfield-container']} key={data.id}>
                    <div className={styles['first-description']}>
                      Data Produk
                    </div>
                    <div className={styles['first-field']}>
                      <MuiThemeProvider theme={theme}>
                        <TextField
                          key={data.id}
                          id="commodityCategory"
                          select
                          value={data.commodityCategory}
                          onChange={this.handleChangeCommodityCategory(
                            'commodityCategory',
                            data.id,
                          )}
                          fullWidth
                        >
                          {dataCommodityCategory.map(option => (
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
                    <div className={styles['first-description']} />
                    <div className={styles['first-field']}>
                      <MuiThemeProvider theme={theme}>
                        <TextField
                          id="commodityType"
                          select
                          value={data.commodityType}
                          onChange={this.handleChangeCommodityType(
                            'commodityType',
                            data.id,
                          )}
                          fullWidth
                          disabled={data.commodityCategory === 'NONE'}
                        >
                          {dataCommodityType.map(option => (
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
                    <div className={styles['first-description']} />
                    <div className={styles['first-field']}>
                      <MuiThemeProvider theme={theme}>
                        <TextField
                          id="brand"
                          select
                          value={data.brand}
                          onChange={this.handleChangeBrand('brand', data.id)}
                          fullWidth
                        >
                          {dataBrand.map(option => (
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
                    <div className={styles['model-description']} />
                    <div className={styles['second-field']}>
                      <MuiThemeProvider theme={theme}>
                        <InputBase
                          id="model"
                          placeholder="Isi Model Barang"
                          fullWidth
                          onChange={this.handleChangeModel('model', data.id)}
                          onKeyUp={this.handleChangeModel('model', data.id)}
                          value={data.model}
                        />
                      </MuiThemeProvider>
                    </div>
                    <div className={styles['second-description']}>
                      Harga Barang
                    </div>
                    <div className={styles['second-field']}>
                      <MuiThemeProvider theme={theme}>
                        <NumberFormat
                          customInput={InputBase}
                          thousandSeparator
                          fullWidth
                          placeholder="Isi Harga Barang"
                          startAdornment={
                            <InputAdornment position="start">Rp</InputAdornment>
                          }
                          onValueChange={this.handleValueChangePrice}
                          value={data.price}
                          isNumericString
                        />
                      </MuiThemeProvider>
                    </div>
                  </div>
                ))}
                <div //   commodityType !== 'NONE' && //   commodityCategory !== 'NONE' && // className={
                  //   brand !== 'NONE'
                  //     ? styles['add-item-button-container']
                  //     : styles['add-item-button-container-disabled']
                  // }
                  // onClick={
                  //   commodityCategory !== 'NONE' &&
                  //   commodityType !== 'NONE' &&
                  //   brand !== 'NONE'
                  //     ? this.addDataProduct
                  //     : Logger(() => console.log('buttondisabled'))
                  // }
                  // onKeyPress={
                  //   commodityCategory !== 'NONE' &&
                  //   commodityType !== 'NONE' &&
                  //   brand !== 'NONE'
                  //     ? this.addDataProduct
                  //     : Logger(() => console.log('buttondisabled'))
                  // }
                  role="button"
                  tabIndex="0"
                >
                  <p>Tambah Barang</p>
                </div>
                <div className={styles['textfield-container']}>
                  <div className={styles['total-description']}>
                    Uang Muka + Biaya Admin
                  </div>
                  <div className={styles['total-field']}>
                    <MuiThemeProvider theme={theme}>
                      <NumberFormat
                        customInput={InputBase}
                        thousandSeparator
                        fullWidth
                        placeholder="Isi Total Pembayaran Tunai"
                        startAdornment={
                          <InputAdornment position="start">Rp</InputAdornment>
                        }
                        onValueChange={this.handleValueChangeTotal}
                        isNumericString
                        // value={total}
                      />
                    </MuiThemeProvider>
                  </div>
                </div>
                <div //   commodityType !== 'NONE' && //   commodityCategory !== 'NONE' && // className={
                  //   brand !== 'NONE' &&
                  //   model.length !== 0 &&
                  //   price.length !== 0 &&
                  //   total.length !== 0
                  //     ? styles['submit-button-container']
                  //     : styles['submit-button-container-disabled']
                  // }
                  // onClick={
                  //   commodityCategory !== 'NONE' &&
                  //   commodityType !== 'NONE' &&
                  //   brand !== 'NONE' &&
                  //   model.length !== 0 &&
                  //   price.length !== 0 &&
                  //   total.length !== 0
                  //     ? this.validatePrice
                  //     : Logger(() => console.log('buttondisabled'))
                  // }
                  // onKeyPress={
                  //   commodityCategory !== 'NONE' &&
                  //   commodityType !== 'NONE' &&
                  //   brand !== 'NONE' &&
                  //   model.length !== 0 &&
                  //   price.length !== 0 &&
                  //   total.length !== 0
                  //     ? this.validatePrice
                  //     : Logger(() => console.log('buttondisabled'))
                  // }
                  role="button"
                  tabIndex="0"
                >
                  <p>Lanjut</p>
                </div>
                <div
                  className={styles['back-button-container']}
                  role="button"
                  tabIndex="0"
                >
                  <p>Kembali</p>
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

export default StepTwo;
