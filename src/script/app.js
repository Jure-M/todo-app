const createElement = require("virtual-dom/create-element");
const diff = require("virtual-dom/diff");
const patch = require("virtual-dom/patch");

function app(initModel, reducer, view, node) {
  let model = initModel;
  let currentView = view(dispatch, initModel);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);

  function dispatch(msg) {
    model = reducer(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

export default app;
