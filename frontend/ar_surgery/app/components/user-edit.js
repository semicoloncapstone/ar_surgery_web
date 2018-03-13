import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    isChangingPassword: false,
    passButtonTitle: 'Change Password',
    currentUser: null,
    userName: null,
    seeNoSee: "password",
    buttonIcon: "fas fa-eye",

    init(){
        this._super(...arguments);
        var auth = this.get('oudaAuth');
        var self = this;
    
        this.set('userName', auth.getName);
        this.get('store').queryRecord('user',{userName: auth.getName}).then(function (record){
            self.set('currentUser', record);
        });
    },

    actions: {
        savePass(){
            var authentication = this.get('oudaAuth');
            var myStore = this.get('store');
            var userName = this.get('name');
            var hashedPassword = authentication.hash(this.get('firstPassword'));
            var self = this;
            myStore.queryRecord('password', {filter: {userName: authentication.getName}}).then(function (userShadow) {
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
            this.set('isChangingPassword', false);
            this.set('passButtonTitle', 'Change Password');
        },

        changePass(){
            if (this.get('isChangingPassword') === false){
                this.set('isChangingPassword', true);
                this.set('passButtonTitle', 'Cancel Change Password');
            } else {
                this.set('isChangingPassword', false);
                this.set('passButtonTitle', 'Change Password');
            }
            
        },

        save() {
            var authentication = this.get('oudaAuth');
            var name = authentication.getName;
            var myStore = this.get('store');
            var self = this;
            
            myStore.queryRecord('password', {filter: {userName: name}}).then(function (userShadow) {
                
                myStore.find('user', userShadow.get('user').get('id')).then(function(user) {
                    userShadow.set('user', self.get('currentUser'));
                    userShadow.set('userName', self.get('userName'));
                    userShadow.save().then(function () { user.save(); });
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
