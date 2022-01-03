// import { BrowserModule } from '@angular/platform-browser';
// import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { TreeGridAllModule, TreeGridModule, PageService, FilterService, EditService, ToolbarService,SortService, ResizeService, ExcelExportService, PdfExportService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
// import {ButtonModule} from '@syncfusion/ej2-angular-buttons';
// import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
// import { DialogModule } from '@syncfusion/ej2-angular-popups';

// import { AppComponent } from './app.component';
// import { GridModule, PagerModule } from '@syncfusion/ej2-angular-grids';
// import { ContextMenuModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     TreeGridModule,
//     GridModule,
//     PagerModule,
//     ButtonModule,
//     DropDownListAllModule,
//     ContextMenuModule,
//     TreeGridAllModule,
//     ToolbarModule,
//     DialogModule
//   ],
//   providers: [PageService,
//     SortService,
//     FilterService,
//     EditService,
//     SortService, ResizeService,
//     ExcelExportService,
//     PdfExportService, ContextMenuService,
//     ToolbarService],
//   bootstrap: [AppComponent],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
// export class AppModule { }



import { DialogModule } from '@syncfusion/ej2-angular-popups';

import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { ToolbarModule, ToolbarAllModule } from '@syncfusion/ej2-angular-navigations';

import { ButtonAllModule , CheckBoxAllModule} from '@syncfusion/ej2-angular-buttons';



import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({ declarations: [ AppComponent ], imports: [ CommonModule, TreeGridAllModule, ToolbarModule, DropDownListAllModule, ButtonAllModule, DialogModule, MultiSelectAllModule, CheckBoxAllModule, ReactiveFormsModule, FormsModule, BrowserModule], providers: [], bootstrap: [AppComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
