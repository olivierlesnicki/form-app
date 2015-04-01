import Ember from 'ember';
import layout from '../../templates/components/bg-form/form';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'form',
  init: function () {
    this._super();

    // do we need it ?
    this.set('propertyList', Object.keys(this.get('data')));

    this.get('propertyList').forEach((prop) => {
        this.addObserver('data.' + prop, this, 'addListener');
    });
    console.log(this.get('validations'));
  },
  addListener: function (context, prop) {
    // console.log('yo', prop);

  }
  // t: function () {
  //   console.log(2);
  // }.observes('dataHasChanged')



});
