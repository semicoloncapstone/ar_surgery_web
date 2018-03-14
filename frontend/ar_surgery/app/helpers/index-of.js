import Ember from 'ember';

export function indexOf([context, ndx]) {
  return context[ndx];
}

export default Ember.Helper.helper(indexOf);
