function isMounted(compo){
  try {
    React.findDOMNode(component);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = isMounted;