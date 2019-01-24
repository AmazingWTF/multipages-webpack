import { say } from '@/utils/index';

console.log('this is index page');

const a = [1, 3, 5];

console.log([
  ...a
])

let o = {
  a: '111',
  b: '2222'
}

let b = {
  ...o,
  test: 'added'
}

console.log(b);

say();
