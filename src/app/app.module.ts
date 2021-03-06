import { NgModule }      from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { HttpModule, JsonpModule } from '@angular/http';

import { FormsModule } from '@angular/forms'
import { COMPILER_PROVIDERS } from '@angular/compiler';

import { BlockComponent, LoaderComponent}  from './block.component';
import { ComponentDirectory } from './components/componentdirectory.provider'
import { NavBar } from './components/navbar.component'

import { Auth } from './Auth.service'


@NgModule({
  imports:      [ BrowserModule, HttpModule,FormsModule],
  declarations: [BlockComponent, LoaderComponent, NavBar],
  bootstrap:    [ BlockComponent, NavBar ],
  providers: [ COMPILER_PROVIDERS, Auth, ComponentDirectory]
})

export class AppModule {
}
