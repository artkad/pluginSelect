import {Select} from './select/select';
import './style.sass';

const langs = [
  {
    'id': '1',
    'name': 'React'
  },
  {
    'id': '2',
    'name': 'JS'
  },
  {
    'id': '3',
    'name': 'TS'
  },
  {
    'id': '4',
    'name': 'Next'
  }
]


const select = new Select('#select', {
  placeholder: 'Выбери элемент',
  langs
});


window.s = select;
