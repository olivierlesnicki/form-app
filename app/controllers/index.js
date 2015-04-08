import Ember from 'ember';
import validations from '../validations/userRules';

export default Ember.Controller.extend({
  formModelHelper1: Ember.inject.service('formModelHelper'),
  formModelHelper2: Ember.inject.service('formModelHelper'),
  userSet: function () {
    this.set('user1', this.get('formModelHelper').create({
      firstName: 'Gabor',
      lastName: 'Czene',
      validations: validations
    }));
    this.set('user2', this.get('formModelHelper2').create({
      firstName: 'Olivier',
      lastName: '',
      validations: {
        firstName: {
          presence: true,
          length: {minimum: 3}
        },
        lastName: {
          presence: true
        }
      }
    }));

    // setTimeout(() => {
    //   console.log(this.get('user'));
    // }, 1000);
  }.on('init')
});
