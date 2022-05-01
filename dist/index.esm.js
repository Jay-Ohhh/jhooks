function bar() {
  console.log(1);
}

var Foo = function Foo() {
  bar();
};

export { Foo };
