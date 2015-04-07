import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Object.extend(EmberValidations.Mixin, {
  fruit: 'apple',
  // init: function () {
  //   var keys;
  //   keys = Object.keys(this);
  //   this._super();
  //   console.log(keys);
  // }
  _addObserver: function (sender, key) {
    var valid = !this.get('errors.' + key + '.length');
    this.set('status.' + key + '.valid', valid);
  },
  valid: function () {
    var valid = this.get('status').some(function (elem) {
      console.log(elem);
      return false;
    });
    console.log('YO');
    return true;
  }.property('status.@each.valid'),
  create: function (props) {
    console.log('validations', props.validations);
    this.set('status', {});
    if (props.validations) {
      this.set('validations', props.validations);
      delete props.validations;
      this.init();
    }

    Object.keys(props).forEach((prop) => {
      this.set('status.' + prop, {
        errorMsg: '',
        valid: true
      });
      this.set(prop, props[prop]);
      this.addObserver(prop, this, '_addObserver');
    });
    // this.validate();
    return this;
  }
});
