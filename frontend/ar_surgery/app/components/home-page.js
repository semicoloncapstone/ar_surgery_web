import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    username: "",
    currentUser: null,
    isHomePage: true, 
    isHistoryPage: false,
    isClassesPage: false,
    isMessagesPage: false,
    isSettingsPage: false,
    isUserLogPage: false,
    Ho: "w3-purple",
    Hi: "",
    C: "",
    M: "",
    S: "",
    Ul: "",
    sideBarClosed: true,

    init() {
        this._super(...arguments);
        var auth = this.get('oudaAuth');
        var self = this;
        this.set('username', auth.getName);
        //this.set('currentUser', self.get('store').queryRecord('user',{userName: auth.getName}));
        if (auth.getName === "Root"){
            
        } else {
            this.get('store').queryRecord('user',{userName: auth.getName}).then(function (record){
                self.set('currentUser', record);
                //console.log(record);
            });
        }
        
        //this.set('username', this.get('currentUser').firstName + " " + this.get('currentUser').lastName);
    },

    actions: {
    
        HomePress () {
            this.set('isHomePage', true);
            this.set('Ho', "w3-purple");
            this.set('isHistoryPage', false);
            this.set('Hi', "");
            this.set('isClassesPage', false);
            this.set('C', "");
            this.set('isMessagesPage', false);
            this.set('M', "");
            this.set('isSettingsPage', false);
            this.set('S', "");
            this.set('isUserLogPage', false);
            this.set('Ul', "");
            $('#mySidebar').css({ display: "none" });
            this.set('sideBarClosed', true);

        },
        HistoryPress() {
            this.set('isHomePage', false);
            this.set('Ho', "");
            this.set('isHistoryPage', true);
            this.set('Hi', "w3-blue");
            this.set('isClassesPage', false);
            this.set('C', "");
            this.set('isMessagesPage', false);
            this.set('M', "");
            this.set('isSettingsPage', false);
            this.set('S', "");
            this.set('isUserLogPage', false);
            this.set('Ul', "");
            $('#mySidebar').css({ display: "none" });
            this.set('sideBarClosed', true);
        },
        ClassPress() {
            this.set('isHomePage', false);
            this.set('Ho', "");
            this.set('isHistoryPage', false);
            this.set('Hi', "");
            this.set('isClassesPage', true);
            this.set('C', "w3-red");
            this.set('isMessagesPage', false);
            this.set('M', "");
            this.set('isSettingsPage', false);
            this.set('S', "");
            this.set('isUserLogPage', false);
            this.set('Ul', "");
            $('#mySidebar').css({ display: "none" });
            this.set('sideBarClosed', true);
        },
        MessagePress() {
            this.set('isHomePage', false);
            this.set('Ho', "");
            this.set('isHistoryPage', false);
            this.set('Hi', "");
            this.set('isClassesPage', false);
            this.set('C', "");
            this.set('isMessagesPage', true);
            this.set('M', "w3-green");
            this.set('isSettingsPage', false);
            this.set('S', "");
            this.set('isUserLogPage', false);
            this.set('Ul', "");
            $('#mySidebar').css({ display: "none" });
            this.set('sideBarClosed', true);
        },
        SettingsPress() {
            this.set('isHomePage', false);
            this.set('Ho', "");
            this.set('isHistoryPage', false);
            this.set('Hi', "");
            this.set('isClassesPage', false);
            this.set('C', "");
            this.set('isMessagesPage', false);
            this.set('M', "");
            this.set('isSettingsPage', true);
            this.set('S', "w3-orange");
            this.set('isUserLogPage', false);
            this.set('Ul', "");
            $('#mySidebar').css({ display: "none" });
            this.set('sideBarClosed', true);
            //console.log(this.get('oudaAuth').get('isAuthenticated'));
            //this.get('routing').transitionTo('add-user');
        },

        LogPress(){
            this.set('isHomePage', false);
            this.set('Ho', "");
            this.set('isHistoryPage', false);
            this.set('Hi', "");
            this.set('isClassesPage', false);
            this.set('C', "");
            this.set('isMessagesPage', false);
            this.set('M', "");
            this.set('isSettingsPage', false);
            this.set('S', "");
            this.set('isUserLogPage', true);
            this.set('Ul', "w3-yellow");
            $('#mySidebar').css({ display: "none" });
            this.set('sideBarClosed', true);
        },

        openSmallBar(){
            //console.log($('#mySidebar').show());
            $('#mySidebar').css({ display: "block" });
            this.set('sideBarClosed', false);
        },

        closeSmallBar(){
            $('#mySidebar').css({ display: "none" });
            this.set('sideBarClosed', true);
        }

    }
    
});
