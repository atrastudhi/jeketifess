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
    // let a = filter.clean('yakali gangentot');
    return {
        test: filter.clean('yakali ga memek')
    }
}

console.log(b())