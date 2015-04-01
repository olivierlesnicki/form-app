import Ember from 'ember';
import layout from '../templates/components/bg-form2';

export default Ember.Component.extend({
  layout: layout,
  onDataChanged: function () {
    console.log('data changed')
  }.observes('data')
});
