import DS from 'ember-data';
export default DS.RESTAdapter.extend({
  namespace: 'api',
  shouldReloadAll: function ()
  {
    return true;
  },

  shouldBackgroundReloadRecord: function (store, aModel)
  {
    return !aModel.record.get("isNew");
  }
});

