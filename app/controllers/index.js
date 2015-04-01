import Ember from 'ember';
import userFormRules from '../validation-rules/userFormRules';

export default Ember.Controller.extend({
  user: {
    firstName: 'Olivier',
    lastName: 'Lesnicki'
  },
  userFormRules: userFormRules,
  onFirstNameChange: function () {
    console.log('user', this.get('user'));
    // console.log('user.valid', this.get('user.valid'));
    console.log(this.get('userFormRules.firstName'));
  }.observes('user.firstName')
});
