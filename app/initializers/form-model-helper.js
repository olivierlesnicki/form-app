export function initialize(container, application) {
  application.register('service:form-model-helper', 'formModelHelper', {singleton: false});
  application.inject('controller', 'formModelHelper', 'service:form-model-helper');
}

export default {
  name: 'form-model-helper',
  initialize: initialize
};
