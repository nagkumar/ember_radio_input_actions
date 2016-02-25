import Em from 'ember';
import DS from 'ember-data';

var EmberModelDeepCloneAndCopy = Em.Object.extend({
  record: null,
  isArray: false,
  isDirty: false,

  makeDirty(record, key){
    return this.set('isDirty', true);
  },

  copyFromRecordOnInit: (function ()
    {
      var record = this.get('record');
      var model = this.get('model');
      var original = record ? record.constructor : model;
      if (original.eachAttribute)
      {
        original.eachAttribute((name) =>
                               {
                                 var value = record ? record.get(name) : null;
                                 this.set(name, value);
                                 return this.addObserver(name, this, 'makeDirty');
                               });
        if (record)
        {
          this.set('id', record.get('id'));
        }
        return original.eachRelationship((name, props) =>
                                         {
                                           var value = record ? record.get(name) : null;
                                           if (props.kind === 'hasMany')
                                           {
                                             this.set(name, []);
                                             if (value)
                                             {
                                               this.get(name).pushObjects(value.toArray());
                                             }
                                             return this.addObserver(`${name}.[]`, this, 'makeDirty');
                                           }
                                           else
                                           {
                                             this.set(name, value);
                                             return this.addObserver(`${name}`, this, 'makeDirty');
                                           }
                                         });
      }
    }

  ).on('init'),

  copyToRecord(store) {
    var aRecord = this.get("record");
    if (aRecord === undefined || aRecord===null)
    {
      aRecord = store.createRecord(this.get("model.modelName"));
      this.set('record', aRecord);
    }
    aRecord.constructor.eachAttribute((name) =>
                                      {
                                        aRecord.set(name, this.get(name));
                                        return this.removeObserver(name, this, 'makeDirty');
                                      });
    this.get("record").constructor.eachRelationship((name, props) =>
                                                    {
                                                      if (props.kind === 'hasMany')
                                                      {
                                                        this.get("record").get(name).clear();
                                                        this.get("record").get(name).pushObjects(this.get(name).toArray());
                                                      }
                                                      else
                                                      {
                                                        aRecord.set(name, this.get(name));
                                                      }
                                                      return this.removeObserver(`${name}.[]`, this, 'makeDirty');
                                                    });
    return this.set('isDirty', false);
  }
});

export default EmberModelDeepCloneAndCopy
