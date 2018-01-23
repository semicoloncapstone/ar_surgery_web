import Ember from 'ember';

export default Ember.Component.extend({

    isHomePage: true, 
    isHistoryPage: false,
    isClassesPage: false,
    isSettingsPage: false,

    actions: {
    
        HomePress () {
            this.set('isHomePage', true);
            this.set('isHistoryPage', false);
            this.set('isClassesPage', false);
            this.set('isSettingsPage', false);
        },
        HistoryPress() {
            this.set('isHomePage', false);
            this.set('isHistoryPage', true);
            this.set('isClassesPage', false);
            this.set('isSettingsPage', false);
        },
        ClassPress() {
            this.set('isHomePage', false);
            this.set('isHistoryPage', false);
            this.set('isClassesPage', true);
            this.set('isSettingsPage', false);
        },
        SettingsPress() {
            this.set('isHomePage', false);
            this.set('isHistoryPage', false);
            this.set('isClassesPage', false);
            this.set('isSettingsPage', true);
        },

    }
    
});
