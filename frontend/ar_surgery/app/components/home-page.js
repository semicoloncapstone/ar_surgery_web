import Ember from 'ember';

export default Ember.Component.extend({

    isHomePage: true, 
    isHistoryPage: false,
    isClassesPage: false,
    isMessagesPage: false,
    isSettingsPage: false,
    Ho: "w3-purple",
    Hi: "",
    C: "",
    M: "",
    S: "",

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
        },

    }
    
});
