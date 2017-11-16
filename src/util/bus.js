function checkFilter(category, title, checked) {
  if (checked) {
    this[category].push(title);
  } else {
    // this return -1 if title is not in the array
    let index = this[category].indexOf(title);
    if (index > -1) {
      // remove 1 element from array
      this[category].splice(index, 1);
    }
  }
}

export { checkFilter };
