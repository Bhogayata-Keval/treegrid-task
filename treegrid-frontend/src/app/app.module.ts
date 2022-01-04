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
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { AppComponent } from './app.component';

@NgModule({ declarations: [ AppComponent ], imports: [ CommonModule, TreeGridAllModule, ToolbarModule, DropDownListAllModule, ButtonAllModule, DialogModule, MultiSelectAllModule, CheckBoxAllModule, ReactiveFormsModule, FormsModule, BrowserModule, TextBoxModule], providers: [], bootstrap: [AppComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
