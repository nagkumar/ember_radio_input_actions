import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
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
