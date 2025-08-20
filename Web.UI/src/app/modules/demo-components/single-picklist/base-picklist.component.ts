export class BasePicklistComponent {

   // change this page size must edit css file of the derived components
    pageSize = 6;

    calculateHeight(heightUnit: number, totalItem: number): string {
      if (!totalItem) {
        return heightUnit.toString();
      }
      if (totalItem < this.pageSize) {
        return (heightUnit * totalItem + 10).toString();
      }
      // "+ 0.55" for the case the scroll bar is not displayed, the last option must be displayed 1/2 height
      return (heightUnit * (this.pageSize + 0.55)).toString();
    }
  }
