import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  isUsersShowing: true,
  isFeatureEditing: false,
  isRolesEditing: false,
  ChangePasswordEnabled: true,
  EditUserEnabled: false,
  

  UA: "w3-orange",
  SR: "",
  SP: "",


  ADM01IsPermitted: Ember.computed(function(){ //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("ADM01") >= 0);
    }
  }),

  UE001IsPermitted: Ember.computed(function(){ //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("UE001") >= 0);
    }
  }),

  didInsertElement() {
    Ember.$(document).ready(function(){
      Ember.$('.ui .item').on('click', function() {
        Ember.$('.ui .item').removeClass('active');
        Ember.$(this).addClass('active');
      });
    });
  },

  actions: {

    save(){
      var authentication = this.get('oudaAuth');
      var myStore = this.get('store');
      var userName = this.get('name');
      var hashedPassword = authentication.hash(this.get('firstPassword'));
      var self = this;
      myStore.queryRecord('password', {filter: {userName: userName}}).then(function (userShadow) {
        userShadow.set('encryptedPassword', hashedPassword);
        userShadow.set('passwordMustChanged', true);
        userShadow.set('passwordReset', false);
        userShadow.save().then(function () {
          self.get('oudaAuth').close();
            //alert("Password Changed");
            self.set('main', true);
            self.set('change', false);
          //self.get('routing').transitionTo('login');
        });
      });
    },

    manageUsers () {
      this.set('isUsersShowing', true);
      this.set('isFeaturesEditing', false);
      this.set('isRolesEditing', false);
      
      this.set('UA', 'w3-orange');
      this.set('SR', '');
      this.set('SP', '');

    },
    manageRoles (){
      this.set('isUsersShowing', false);
      this.set('isFeaturesEditing', false);
      this.set('isRolesEditing', true);
      
      this.set('UA', '');
      this.set('SR', 'w3-orange');
      this.set('SP', '');
    },

    manageFeatures (){
      this.set('isUsersShowing', false);
      this.set('isFeaturesEditing', true);
      this.set('isRolesEditing', false);
      
      this.set('UA', '');
      this.set('SR', '');
      this.set('SP', 'w3-orange');
    },

    changePassword (){
      this.set('ChangePasswordEnabled', true);
      this.set('EditUserEnabled', false);
    },

    editUser (){
      this.set('ChangePasswordEnabled', false);
      this.set('EditUserEnabled', true);
    }


  }
});
