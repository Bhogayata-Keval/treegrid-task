import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InfiniteScrollService, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { dataSource, virtualData, customData } from './data';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css'],
  providers: [InfiniteScrollService]
})
export class AppComponent {
  title = 'treegrid-frontend';
  public data: object[];
  public pageSettings: Object;

  @ViewChild('treegrid',{ static: true })
  public treegrid: TreeGridComponent;
  public contextMenuItems: Object[];
  public editSettings: Object;
  public treegridColumns: any = [];



  constructor (private elementRef:ElementRef) {

  }



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (customData.data.length === 0) {
      dataSource();
    }
    this.data = customData.data;
    console.log("🚀 ~ file: app.component.ts ~ line 28 ~ AppComponent ~ ngOnInit ~ this.data", Object.keys(this.data[0]))
    this.pageSettings= { pageSize: 50 };

    this.editSettings = {allowEditing: true, allowAdding: true, allowDeleting: true, mode:"Row"};
    this.contextMenuItems = [
      { text: 'Insert Column', target: '.e-headercontent', id: 'insert' },
      { text: 'Delete Column', target: '.e-headercontent', id: 'delete' },
      { text: 'Rename Column', target: '.e-headercontent', id: 'rename' }
    ];
  }

  ngAfterViewInit(){
    for (let i: number = 0; i < Object.keys(this.data[0]).length; i++) {
      if (Object.keys(this.data[0])[i] !== 'child') {
        this.treegridColumns.push({
          'field': Object.keys(this.data[0])[i],
          'width': customData.settings[Object.keys(this.data[0])[i]].width,
          'headerText': customData.settings[Object.keys(this.data[0])[i]].alias
        })
      }
    }



  }

  contextMenuClick(args?: MenuEventArgs): void {
    if (args.item.id === 'insert') {
      let columnName:any = { field: 'priority', width: 100 };
      this.treegrid.columns.push(columnName); // Insert Columns
      this.treegrid.refreshColumns(); // Refresh Columns
    } else if (args.item.id === 'delete') {
      let columnName = 2;
      this.treegrid.columns.splice(columnName, 1); //Splice columns
      this.treegrid.refreshColumns(); //Refresh Columns
    } else if (args.item.id === 'rename') {
      let columnName = 2;
      this.treegrid.getColumnByField('taskName'); //Get the required column
      this.treegrid.getColumnByField('taskName').headerText = 'Task details'; //Rename column name
      this.treegrid.refreshColumns(); //Refresh Columns
    }
  }

  contextMenuOpen(arg?: BeforeOpenCloseEventArgs) : void {
      let elem: Element = arg.event.target as Element;
      let uid: string = elem.closest('.e-row').getAttribute('data-uid');
      if (isNullOrUndefined(getValue('hasChildRecords', this.treegrid.grid.getRowObjectFromUID(uid).data))) {
          arg.cancel = true;
      } else {
          let flag: boolean = getValue('expanded', this.treegrid.grid.getRowObjectFromUID(uid).data);
          let val: string = flag ? 'none' : 'block';
          document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
          val = !flag ? 'none' : 'block';
          document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
      }
  }


}
