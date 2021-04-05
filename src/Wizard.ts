export default class Wizard {
    static waitingSince(date: Date): string { 
        const diff = Wizard.daysPassed(date)
        if (diff == 0) {
          return "Today"
        } else if (diff == 1) {
          return "1 day passed!"
        } else {
          return `${diff} days passed!`
        }
     }    

    private static  daysPassed(date: Date) {              
      var current = new Date();      
      return Math.ceil((current.getTime() - date.getTime() + 1) / 86400000);
    }
}