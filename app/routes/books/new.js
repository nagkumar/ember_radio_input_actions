import Ember from 'ember';
import EmberModelDeepCloneAndCopy from 'example1/models/utils/ember-model-deep-clone-and-copy';

export default Ember.Route.extend({
  model: function (params)
  {
    return EmberModelDeepCloneAndCopy.create({model: this.store.modelFor('book')});
  },

  actions: {
    createBook: function (formModel)
    {
      formModel.copyToRecord(this.store);
      return formModel.get("record").save().then((record) =>
                                                 {
                                                   return this.transitionTo('books.book', record.id);
                                                 }
      ).catch((xhr) =>
              {
                formModel.get('record').deleteRecord();
                formModel.set('record', null);
              }
      );
    }
  }
});
