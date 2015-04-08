/**
 * Form model helper
 * this service based on ember-validation see https://github.com/dockyard/ember-validations
 * Example controller: <todo: URL of github example controller>
 *
 *  this service will generate a '$status' object on the passed obj.
 *  e.g. user: {firstName: 'John', lastName: 'Doe'}
 *  will have new properties like
 *  - $status.firstName.valid   => one property validity
 *  - errors.firstName          => see: ember-validations
 *  - $valid                    => indicates the whole object validity (if any of them is invalid, it becomes to false too)
 *
 */

import Ember from 'ember';
import EmberValidations from 'ember-validations';

var statusObjectPrefix = '$status';

export default Ember.Service.extend(EmberValidations.Mixin, {
  /**
   * Observer for form properties
   */
  _addObserver: function () {
    this.setValidationByErrors();
  },
  /**
   * Over ride status prefix.
   * this status object contains the validity flags of properties
   * for example this.get('$status.firstName.valid');
   * default is '$status'
   * call it before 'create' method!
   * @param {[type]} a [description]
   */
  setStatusPrefix: function (newPrefix) {
    statusObjectPrefix = newPrefix || statusObjectPrefix;
    return this;
  },
  /**
   * Setting validity flags depends on ember-validation.errors
   */
  setValidationByErrors: function () {
    this.set('$valid', true);
    return this.validate()
      .catch((err) => {
        // one of them fails => the form is invalid
        this.set('$valid', false);
      })
      .finally(() => {
        // looping through the passed validation rules and compare it to ember-validations.errors
        // and sets up true | false on the
        Ember.keys(this.get('validations'))
          .forEach((key) => {
            this.setOnePropertyValidity(key, !this.get('errors.' + key).get('length'));
          });
      });
  },
  /**
   * Set up one form property flag
   * @param {String}  prop   property name
   * @param {Boolean} value  value to set
   * @return {this}
   */
  setOnePropertyValidity: function (prop, value) {
    this.set(statusObjectPrefix + '.' + prop + '.valid', value);
    return this;
  },
  /**
   * part of initialization
   * based on the passed form properties sets up status object
   * @param {String}  prop    property name
   * @return {Object} this
   */
  setDefaultStatusObject: function (prop) {
    this.set(statusObjectPrefix + '.' + prop, {});
    return this;
  },
  /**
   * Creating an instance and sets up initial values
   * validation fired
   * @param  {Object}   props  propertes' key, value + validations
   * @return {Object}           this
   */
  create: function (props) {
    this.set(statusObjectPrefix, {});
    Ember.keys(props).forEach((prop) => {
      if (prop !== 'validations') {
        this.set(prop, props[prop])
          .setDefaultStatusObject(prop)
          .setOnePropertyValidity(prop, true)
          .addObserver(prop, this, '_addObserver');
      }
    });

    if (props.validations) {
      this.set('validations', props.validations);
      this.init();
      this.setValidationByErrors();
    }
    return this;
  }
});
