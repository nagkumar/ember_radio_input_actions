import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr('string'),
  isbn: DS.attr('string'),
  pages: DS.attr('number'),
  description: DS.attr('string'),
  type: DS.attr('string'),
  publisher: DS.belongsTo('publisher', {async: true}),
  authors: DS.hasMany('author', {async: true}),
  reviews: DS.hasMany("review", {async: true})
});
