const badword = require('bad-words')

const filter = new badword();

const cursed = [
  'ngentot',
  'kontol',
  'memek',
  'tai',
  'jancok',
  'asu',
  'bangsat',
  'tempik',
  'ngentu',
  'anjing',
  'babi',
  'peler',
  'pelir',
  'itil'
];

filter.addWords(...cursed);

let b = () => {
    return {
        test: filter.clean('yakali ga ngentu')
    }
}

console.log(b())