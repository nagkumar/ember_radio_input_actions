import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  custom: false,
  active: true,
  archival: false,

  validations: {
    'model.firstName': {
      presence: true,
      length: {minimum: 5}
    },
    'model.age': {
      numericality: true
    },
    'model.profile': true
  }
});
