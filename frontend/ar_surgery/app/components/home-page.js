import Ember from 'ember';

export default Ember.Component.extend({

    isHomePage: true, 
    isHistoryPage: false,
    isClassesPage: false,
    isSettingsPage: false,
    Ho: "w3-blue",
    Hi: "",
    C: "",
    S: "",

    actions: {
    
        HomePress () {
            this.set('isHomePage', true);
            this.set('Ho', "w3-blue");
            this.set('isHistoryPage', false);
            this.set('Hi', "");
            this.set('isClassesPage', false);
            this.set('C', "");
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
            this.set('isSettingsPage', false);
            this.set('S', "");
        },
        ClassPress() {
            this.set('isHomePage', false);
            this.set('Ho', "");
            this.set('isHistoryPage', false);
            this.set('Hi', "");
            this.set('isClassesPage', true);
            this.set('C', "w3-blue");
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
            this.set('isSettingsPage', true);
            this.set('S', "w3-blue");
        },

    }
    
});
