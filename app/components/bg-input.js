import Ember from 'ember';
import layout from '../templates/components/bg-input';

var StatusObject = Ember.Object.extend({
  valid: true,
  invalid: Ember.computed.not('valid'),
  pristine: true,
  dirty: Ember.computed.not('pristine'),
  touched: false,
  untouched: Ember.computed.not('touched'),
  focused: false,
  blurred: Ember.computed.not('focused'),
  pending: false,
});

export default Ember.TextField.extend({

  layout: layout,

  classNameBindings: [
    'status.invalid:bg-invalid',
    'status.valid:bg-valid',
    'status.pristine:bg-pristine',
    'status.dirty:bg-dirty',
    'status.touched:bg-touched',
    'status.untouched:bg-untouched',
    'status.pending:bg-pending',
    'status.focused:bg-focused',
    'status.blurred:bg-blurred'
  ],

  value: Ember.computed.alias('model'),
  init: function () {

    var form;
    var component = this;

    this._super();

    // Set default value from model
    // this.set('value', this.get('model'));

    // Create an empty status object
    this.set('status', StatusObject.create({
      name: this.get('name')
    }));

    if (this.get('name')) {

      // Retrieve the parent
      // bg-form component
      do {
        component = component.get('_parentView');
        form = component.get('form');
      } while (component && !form)

      // Store a reference
      // to the bg-form
      // this.form = form;
      // this.form.get('_statuses').pushObject(this.get('status'));
      // this.form.set(this.get('name'), this.get('status'));
      this.set('form', form);
      this.get('form').get('_statuses').pushObject(this.get('status'));
      this.get('form').set(this.get('name'), this.get('status'));

    }

  },

  didInsertElement: function () {

    this.$().blur(() => {
      this.set('status.focused', false);
      this.set('status.touched', true);
    });

    this.$().focus(() => {
      this.set('status.focused', true);
    });

  },

  onBlurInput: function () {

  },

  onValueChange: function () {
    // validation here
    this.set('status.pristine', false);
    this.set('status.valid', false);

  }.observes('value')


});
