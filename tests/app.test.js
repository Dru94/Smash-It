const {daren, sum} = require('../src/app.js');

console.log(typeof(daren));
test('calc sum', ()=>{

	expect(sum(1,2)).toBe(3);
})

test('s func', ()=>{
	expect(daren(2,3)).toEqual(5);
})