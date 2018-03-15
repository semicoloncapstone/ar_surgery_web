import DS from 'ember-data';
import {
  fragment,
  fragmentArray,
  array
} from 'ember-data-model-fragments/attributes';

export default DS.Model.extend({
    date: DS.attr(),
    user: DS.attr(),
    truePath: DS.attr(),
    timeOut: DS.attr(),
    debugged: DS.attr(),

    target: fragment('datapoint'),
    refCube: fragment('datapoint'),
    toolPoints: fragmentArray('datapoint'),
    headPoints: fragmentArray('datapoint'),
});


