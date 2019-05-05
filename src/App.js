import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { currencyRequest, currencyExchange } from './actions/currency';
import './App.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class App extends PureComponent {
  state = {
    inputs: { EUR: '', GBP: '', USD: '', CHF: '', JPY: '', RUB: '' },
    activeCard: 'EUR',
    openDialog: false,
    dialogText: ''
  };

  handleChange = (code, inputRate) => event => {
    this.setState({
      ...this.state,
      inputs: { ...this.state.inputs, [code]: event.target.value }
    });

    if (code === 'EUR') {
      this.props.currency.currencies.forEach(item => {
        if (item.code !== code) {
          this.setState(state => {
            return {
              ...state,
              inputs: {
                ...state.inputs,
                [item.code]: state.inputs[code] * item.rate
              }
            };
          });
        }
      });
    } else {
      this.props.currency.currencies.forEach(item => {
        if (item.code !== code) {
          this.setState(state => {
            return {
              ...state,
              inputs: {
                ...state.inputs,
                [item.code]: (state.inputs[code] / inputRate) * item.rate
              }
            };
          });
        }
      });
    }
  };

  handleClick = (code, mark) => event => {
    const { currencies } = this.props.currency;
    const { currencyExchange } = this.props;

    const active = currencies.find(item => item.code === this.state.activeCard);
    if (
      Number(this.state.inputs[this.state.activeCard]) > Number(active.balance)
    ) {
      this.setState(state => {
        return {
          ...state,
          dialogText: `Недостаточно средств для обмена. На вашем счету ${
            active.balance
          }${active.mark}, а необходимо ${
            this.state.inputs[this.state.activeCard]
          }${active.mark}.`
        };
      });
    } else {
      const purchasedFormula =
        Number(localStorage.getItem(`${code}`)) +
        Number(this.state.inputs[code]);
      const soldFormula =
        Number(localStorage.getItem(`${active.code}`)) -
        Number(this.state.inputs[this.state.activeCard]);

      currencyExchange({
        purchased: {
          code: code,
          newBalance: purchasedFormula
        },
        sold: {
          code: active.code,
          newBalance: soldFormula
        }
      });

      localStorage.setItem(code, purchasedFormula);
      localStorage.setItem(active.code, soldFormula);

      this.setState(state => {
        return {
          ...state,
          dialogText: `На ваш счёт ${code} зачислено ${
            this.state.inputs[code]
          }${mark}. Доступные средства на ${code} счёте: ${purchasedFormula}${mark}.`,
          inputs: { EUR: '', GBP: '', USD: '', CHF: '', JPY: '', RUB: '' }
        };
      });
    }

    this.setState(state => {
      return { ...state, openDialog: true };
    });
  };

  handleFocus = code => event => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.setState(state => ({
      ...state,
      activeCard: code
    }));
  };

  handleClose = () => {
    this.setState({ ...this.state, openDialog: false });
  };

  componentDidMount = () => {
    this.props.currencyRequest();
  };

  render() {
    const { isFetching, currencies } = this.props.currency;
    const { activeCard } = this.state;

    return (
      <div className="wrapper">
        <div className="header">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" component="h1" color="inherit">
                Обмен валюты
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className="container">
          {isFetching ? (
            <div className="cards">
              <Paper
                className="cards__item cards__item--vertical"
                elevation={5}
              >
                <Typography variant="h5" component="h3">
                  Загрузка...
                </Typography>
                <CircularProgress className="preloader" />
                <Typography component="p">
                  Данные обновляются каждые 30 секунд.
                </Typography>
              </Paper>
            </div>
          ) : (
            <div className="cards">
              {currencies.map(item => {
                return (
                  <Paper
                    key={item.code}
                    className={`cards__item ${
                      activeCard === item.code
                        ? `cards__item--first`
                        : `cards__item--default`
                    }`}
                    elevation={5}
                  >
                    <div className="cards__item-column cards__item-column-logo">
                      <img
                        src={item.logotype}
                        alt={`Логотип валюты: ${item.name}`}
                        className="cards__logo"
                      />
                    </div>
                    <div className="cards__item-column cards__item-column-text">
                      <Typography variant="h5" component="h3">
                        {item.code}
                      </Typography>
                      <Typography component="p">{item.name}</Typography>
                    </div>
                    <div className="cards__item-column cards__item-column-input">
                      <TextField
                        variant="outlined"
                        helperText="Количество валюты"
                        type="number"
                        placeholder="0.00"
                        label={item.name}
                        value={this.state.inputs[item.code]}
                        onChange={this.handleChange(item.code, item.rate)}
                        onFocus={this.handleFocus(item.code)}
                        fullWidth={true}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">{`${
                              item.mark
                            }`}</InputAdornment>
                          )
                        }}
                      />
                    </div>
                    <div className="cards__item-column cards__item-column-button">
                      {activeCard === item.code ? null : (
                        <React.Fragment>
                          <Button
                            variant="contained"
                            color="primary"
                            className="cards__button"
                            onClick={this.handleClick(item.code, item.mark)}
                          >
                            Обменять
                          </Button>
                          <Dialog
                            open={this.state.openDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogContent>
                              <DialogContentText id="alert-dialog-slide-description">
                                {this.state.dialogText}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={this.handleClose}
                                color="primary"
                              >
                                ОК
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </React.Fragment>
                      )}
                    </div>
                    <div className="cards__item-column cards__item-column-balance">
                      <Typography component="p">{`У вас есть ${item.balance}${
                        item.mark
                      }`}</Typography>
                    </div>
                  </Paper>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currency: state.currency
});

const mapDispatchToProps = {
  currencyRequest,
  currencyExchange
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
