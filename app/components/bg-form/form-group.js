import Ember from 'ember';
import layout from '../../templates/components/bg-form/form-group';

var isInput = function (html) {
    return !!Ember.$('input', html).length || !!Ember.$('textarea', html).length;
};

export default Ember.Component.extend({
  layout: layout,
  classNames: ['form-group'],
  classNameBindings: [
    'status.invalid:bg-invalid',
    'status.valid:bg-valid',
    'status.pristine:bg-pristine',
    'status.dirty:bg-dirty',
    'status.touched:bg-touched',
    'status.untouched:bg-untouched',
    'status.pending:bg-pending',
    'status.focused:bg-focused',
    'status.blurred:bg-blurred',
    'status.changed:bg-changed'
  ],
  status: Ember.Object.extend({
    valid: true,
    invalid: Ember.computed.not('valid'),
    pristine: true,
    dirty: Ember.computed.not('pristine'),
    touched: false,
    untouched: Ember.computed.not('touched'),
    focused: false,
    blurred: false,
    pending: false,
    changed: false
  }).create(),
  init: function () {
    var component = this,
      form,
      parentComponent;
    this._super();
      // Retrieve the parent
      // form component
      do {
        component = component.get('_parentView');
        console.log('cccc', component);
        form = component.get('data');
      } while (component && !form)
      parentComponent = component.get('_parentView');
      console.log('yoo', parentComponent.get('validations'));

  },
  didInsertElement: function () {
    var html = Ember.$(this.element),
      self = this,
      element;
    if (isInput(html)) {
      element = Ember.$('input', html);
      this.set('inputDomObject', Ember.$('input', html));
      this.set('value', element.val());
      this.set('initialValue', element.val());

      element.on('keyup', function () {
        self.set('status.pristine', false);
        self.set('value', $(this).val());
        self.set('status.changed', self.get('value') !== self.get('initialValue'))
      });
      element.on('focus', function () {
        self.set('status.focused', true);
      });
    }

    element.blur(() => {
      this.set('status.focused', false);
      this.set('status.blurred', true);
      this.set('status.touched', true);
    });

    element.focus(() => {
      this.set('status.focused', true);
    });
  }
});
