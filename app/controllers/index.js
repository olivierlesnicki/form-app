import Ember from 'ember';
import validations from '../validations/userRules';


export default Ember.Controller.extend({
  formModelHelper1: Ember.inject.service('formModelHelper'),
  // user: {
  //   firstName: 'Olivier',
  //   lastName: 'Lesnicki'
  // },
  userSet: function () {
    this.set('user', this.get('formModelHelper').create({
      firstName: 'Gabor',
      lastName: 'Czene',
      validations: validations
    }));

    setTimeout(() => {
      console.log(this.get('user'));
    }, 1000);
  }.on('init'),
  myProp: function () {
    return this.get('formModelHelper.fruit');
  }.property('formModelHelper')
});
