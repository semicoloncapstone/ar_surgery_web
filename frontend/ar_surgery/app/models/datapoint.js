import DS from 'ember-data';
import MF from 'ember-data-model-fragments';

export default MF.Fragment.extend({
  position: DS.attr(),
  orientation: DS.attr(),
  time: DS.attr(),
  inSkull: DS.attr(),
});
