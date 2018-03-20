// Manage the behaviour of the login screen
import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  isPasswordChanging: null,
  tempPassword: null,
  error: "",
  self: this,
  buttonIcon: "fas fa-eye",
  seeNoSee: "password",

  keyPress: function (e) {
      
        if (e.which === 13) {
            Ember.$('#login').click();
        }
  },
  
  errorMessage: Ember.computed ('error', function(){
    return this.get('error');
  }),

  actions: {
    dosomething()
    {
      console.log('uo');
    },
    login(){
      //console.log(this.get('name'));
        //console.log(this.get('password'));
        
        
      var authentication = this.get('oudaAuth');
      var self = this;
      if (this.get('name') === "root"){
        authentication.openRoot(this.get('password')).then(function (name) {
          authentication.set('getName', name);
          self.get('routing').transitionTo('home');
        }, function (error) {
          console.log(error);
        });
      } else {
        authentication.open(this.get('name'), this.get('password')).then(function () {
          authentication.set('getName', self.get('name'));
          self.set('error', "");
          self.get('routing').transitionTo('home');
        }, function (error) {
          if (error === "passwordReset") {
            self.set('isPasswordChanging', true);
          } else if (error === "wrongUserName") {
            self.set('error', 'Please enter a correct user name');
          } else if (error === "wrongPassword") {
            console.log('wrong password error');

            self.set('error', 'Please enter a correct password');
          } else if (error === "loginFailed") {
            self.set('error', 'Login Failed ...');
          }
        });
      }
    },

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
          self.set('isPasswordChanging', false);
          //self.get('routing').transitionTo('login');
        });
      });
    },

    seePass(){
      var self = this;
      if (this.get('seeNoSee') === 'password'){
          self.set('seeNoSee', 'text');
          self.set('buttonIcon', 'fas fa-eye-slash')
      } else {
          self.set('seeNoSee', 'password');
          self.set('buttonIcon', 'fas fa-eye')
      }
    }
  }
});
