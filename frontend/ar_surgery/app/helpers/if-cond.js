import Ember from 'ember';

export function ifCond([v1, condition, v2]) {
  switch (condition) {
    case '==':
        return (v1 == v2);
    case '===':
      return (v1 === v2);
    case '!=':
        return (v1 != v2);
    case '!==':
        return (v1 !== v2);
    case '<':
        return (v1 < v2);
    case '<=':
        return (v1 <= v2);
    case '>':
        return (v1 > v2);
    case '>=':
        return (v1 >= v2);
    case '&&':
        return (v1 && v2);
    case '||':
        return (v1 || v2);
  }
}

export default Ember.Helper.helper(ifCond);
