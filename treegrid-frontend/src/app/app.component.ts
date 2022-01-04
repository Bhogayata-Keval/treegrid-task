import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InfiniteScrollService, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { dataSource, virtualData, customData } from './data';
import { DialogComponent,DialogUtility  } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css'],
  providers: [InfiniteScrollService]
})
export class AppComponent {
  title = 'Treegrid Frontend';
  public data: object[];
  public pageSettings: Object;
  @ViewChild('treegrid',{ static: true }) treegrid: TreeGridComponent;
  @ViewChild('template',{ static: true }) template: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  public targetElement: HTMLElement;

  public contextMenuItems: Object[];
  public editSettings: Object = {allowEditing: true, allowAdding: true, allowDeleting: true, mode:"Row"};
  public treegridColumns: any = [];
  public initialColumns: any = [];
  public actualTableData: any = customData;
  // private appliedColumnSetting: String = ''
  private columnContextMenuArgs: any;
  public columnContextMenuHeader: string = '';
  private DeleteDialogueComponent: any;
  column_name: string = '';
  col_data_type: string = '';
  col_font_size: string = '';
  col_font_color: string = '';
  col_background_color: string = '';
  col_alignments: string = '';
  col_text_wrap: boolean = false;
  min_col_width: string = '';
  data_types: string[] = ['Text','Number','Date','Boolean','DropDownList'];
  alignments: string[] = ['Left','Right','Center'];
  visible: Boolean = false;
  constructor () {

  }

  // Initialize the Dialog component target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }
  public height: string = '250px';
  public dialogOpen: EmitType<object> = (event) => {
    document.getElementById('sendButton').onclick = (): void => {
      if (this.columnContextMenuArgs.item.id === 'insert') {
        this.columnContextMenuHeader = 'Insert Column';
        let columnName:any = { field: this.column_name};
        this.treegrid.columns.push(columnName); // Insert Columns in UI & treegrid
        console.log(this.col_data_type, ' ', this.col_font_size, ' ', this.col_font_color, ' ' , this.col_background_color, ' ', this.col_alignments, ' ', this.col_text_wrap, ' ', this.min_col_width)
        this.manangeInsertJson(columnName.field);
        this.treegrid.refreshColumns();
      } else if (this.columnContextMenuArgs.item.id === 'rename') {
        this.columnContextMenuHeader = 'Rename Column';
        let columnName = 2;
        this.treegrid.getColumnByField('task_id'); //Get the required column
        this.treegrid.getColumnByField('task_id').headerText = 'Task details'; //Rename column name
        this.treegrid.refreshColumns(); //Refresh Columns
      }

      this.template.hide();
    };
  }

  ngOnInit(): void {
    if (customData.data.length === 0) {
      dataSource();
    }

    this.data = customData.data;
    this.pageSettings= { pageSize: 50 };

    // Setting Up context menu for column and rows
    this.contextMenuItems = [
      { text: 'Insert Column', target: '.e-headercontent', id: 'insert' },
      { text: 'Delete Column', target: '.e-headercontent', id: 'delete' },
      { text: 'Rename Column', target: '.e-headercontent', id: 'rename' },
      { text: 'Rename Row', target: '.e-row', id: 'rename' }

    ];
  }

  ngAfterViewInit(){
    this.template.hide();
    for (let i: number = 0; i < Object.keys(this.data[0]).length; i++) {
      this.initialColumns.push(Object.keys(this.data[0])[i]);
      if (Object.keys(this.data[0])[i] !== 'child') {
        this.treegridColumns.push({
          'field': Object.keys(this.data[0])[i],
          'width': customData.settings[Object.keys(this.data[0])[i]].width,
          'headerText': customData.settings[Object.keys(this.data[0])[i]].alias
        });
      }
    }
  }

  manangeInsertJson(colName: any) {
    var result = customData.data.map(function(el) {
      var o = Object.assign({
        [colName]: ''
      }, el);
      return o;
    });
    customData.data = result;
    this.column_name = '';
    this.col_data_type = '';
    this.col_font_size = '';
    this.col_font_color = '';
    this.col_background_color = '';
    this.col_alignments = '';
    this.col_text_wrap = false;
    this.min_col_width = '';
  }

  manageDeleteColJson() {
    this.initialColumns.splice(this.columnContextMenuArgs['column']['index'], 1); // Removed from initial col data

    // const mapWith = (array, keys) => array.map(o => Object.fromEntries(keys.map(k => [k, o[k]]))); // Will only fetch specified column object from JSON data

    // this.actualTableData.data = mapWith(this.actualTableData.data, this.initialColumns);
    // this.actualTableData.data.forEach(element => {
    //   Object.keys(element).forEach(key => element[key] === undefined && delete element[key])
    // });

    customData.data = this.actualTableData.data;
  }

  contextMenuClick(args?: MenuEventArgs): void {
    this.columnContextMenuArgs = args;
    this.onOpenDialog(args)
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

  // Sample level code to handle the button click action
  public onOpenDialog = function(event: any): void {
    // Call the show method to open the Dialog
    if (event.item.id === 'insert') {
      this.template.show(event);
    } else if (event.item.id === 'delete') {
      this.onOpenDeleteDialog(event);
    }
  }

  /**
   * Confirm dialogues SyncFusion utility
   * @param event
   */
  public onOpenDeleteDialog = function(event: any): void {
    this.DeleteDialogueComponent = DialogUtility.confirm({
      title: 'Confirmation Dialog',
      content: "Are you sure you want to delete this column?",
      okButton: {  text: 'OK', click: this.confimDeleteCol.bind(this) },
      cancelButton: {  text: 'Cancel', click: this.cancelDeleteCol.bind(this) },
      showCloseIcon: true,
      closeOnEscape: true
    });
  }

  /**
   * To delete column from UI and JSON
   */
  private confimDeleteCol() {
    this.columnContextMenuHeader = 'Delete Column';
    let columnName = this.columnContextMenuArgs['column']['index'];
    this.treegrid.columns.splice(columnName, 1); //Removed from UI & treegrid

    this.manageDeleteColJson();
    this.treegrid.refreshColumns(); //Refresh Columns
    this.DeleteDialogueComponent.hide();
  }

  /**
   * To handle cancel button click for delete column dialogue
   */
  private cancelDeleteCol(): void {
    this.DeleteDialogueComponent.hide();
  }

}
