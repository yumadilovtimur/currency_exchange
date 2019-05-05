import EURlogo from './assets/flags/EUR.jpg';
import GBPlogo from './assets/flags/GBP.png';
import USDlogo from './assets/flags/USD.jpg';
import CHFlogo from './assets/flags/CHF.png';
import JPYlogo from './assets/flags/JPY.png';
import RUBlogo from './assets/flags/RUB.png';
import ILSlogo from './assets/flags/ILS.jpg';
import PHPlogo from './assets/flags/PHP.jpg';
import TRYlogo from './assets/flags/TRY.jpg';
import CZKlogo from './assets/flags/CZK.jpg';
import CNYlogo from './assets/flags/CNY.jpg';

const currencies = [
  {
    code: 'EUR',
    name: 'Евро',
    mark: '€',
    logotype: EURlogo,
    rate: 1,
    balance:
      localStorage.getItem('EUR') ||
      localStorage.setItem('EUR', '100') ||
      localStorage.getItem('EUR')
  },
  {
    code: 'GBP',
    name: 'Фунт стрелингов',
    mark: '£',
    logotype: GBPlogo,
    rate: null,
    balance:
      localStorage.getItem('GBP') ||
      localStorage.setItem('GBP', '100') ||
      localStorage.getItem('GBP')
  },
  {
    code: 'USD',
    name: 'Доллар',
    mark: '$',
    logotype: USDlogo,
    rate: null,
    balance:
      localStorage.getItem('USD') ||
      localStorage.setItem('USD', '100') ||
      localStorage.getItem('USD')
  },
  {
    code: 'CHF',
    name: 'Франк',
    mark: '₣',
    logotype: CHFlogo,
    rate: null,
    balance:
      localStorage.getItem('CHF') ||
      localStorage.setItem('CHF', '100') ||
      localStorage.getItem('CHF')
  },
  {
    code: 'JPY',
    name: 'Иена',
    mark: '¥',
    logotype: JPYlogo,
    rate: null,
    balance:
      localStorage.getItem('JPY') ||
      localStorage.setItem('JPY', '100') ||
      localStorage.getItem('JPY')
  },
  {
    code: 'RUB',
    name: 'Рубль',
    mark: '₽',
    logotype: RUBlogo,
    rate: null,
    balance:
      localStorage.getItem('RUB') ||
      localStorage.setItem('RUB', '100') ||
      localStorage.getItem('RUB')
  },
  {
    code: 'ILS',
    name: 'Шекель',
    mark: '₪',
    logotype: ILSlogo,
    rate: null,
    balance:
      localStorage.getItem('ILS') ||
      localStorage.setItem('ILS', '100') ||
      localStorage.getItem('ILS')
  },
  {
    code: 'PHP',
    name: 'Песо',
    mark: '₱',
    logotype: PHPlogo,
    rate: null,
    balance:
      localStorage.getItem('PHP') ||
      localStorage.setItem('PHP', '100') ||
      localStorage.getItem('PHP')
  },
  {
    code: 'TRY',
    name: 'Лира',
    mark: '₺',
    logotype: TRYlogo,
    rate: null,
    balance:
      localStorage.getItem('TRY') ||
      localStorage.setItem('TRY', '100') ||
      localStorage.getItem('TRY')
  },
  {
    code: 'CZK',
    name: 'Крона',
    mark: 'Kč',
    logotype: CZKlogo,
    rate: null,
    balance:
      localStorage.getItem('CZK') ||
      localStorage.setItem('CZK', '100') ||
      localStorage.getItem('CZK')
  },
  {
    code: 'CNY',
    name: 'Юань',
    mark: '¥',
    logotype: CNYlogo,
    rate: null,
    balance:
      localStorage.getItem('CNY') ||
      localStorage.setItem('CNY', '100') ||
      localStorage.getItem('CNY')
  }
];

export default currencies;
