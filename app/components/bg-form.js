import Ember from 'ember';
import layout from '../templates/components/bg-form';

var FormObject = Ember.Object.extend({
  valid: function () {
    return !this.get('_statuses').findBy('valid', false);
  }.property('_statuses.@each.valid'),
  invalid: Ember.computed.not('valid')
})

export default Ember.Component.extend({

  layout: layout,

  classNameBindings: [
    'form.invalid:bg-invalid',
    'form.valid:bg-valid'
  ],

  init: function () {
    this._super();
    this.set('form', FormObject.create({
      _statuses: Ember.A([])
    }));
  },

  valid: Ember.computed.readOnly('form.valid'),
  invalid: Ember.computed.readOnly('form.invalid')

});
