export function Toggle(Selector, Class ) {
  Class.forEach(element => {
    Selector.classList.toggle(element)
  });
}