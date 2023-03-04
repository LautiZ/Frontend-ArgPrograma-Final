import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ComponentePruebaComponent } from './components/componente-prueba/componente-prueba.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { interceptorProvider } from './service/interceptor-service';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { NewExpComponent } from './components/experiencia/new-exp.component';
import { EditExpComponent } from './components/experiencia/edit-exp.component';
import { EducationComponent } from './components/education/education.component';
import { NewEducationComponent } from './components/education/new-education.component';
import { EditEducationComponent } from './components/education/edit-education.component';
import { HysComponent } from './components/hys/hys.component';
import { EditSkillComponent } from './components/hys/edit-skill.component';
import { NewSkillComponent } from './components/hys/new-skill.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { EditAcercaDeComponent } from './components/acerca-de/edit-acerca-de.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentePruebaComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    ExperienciaComponent,
    NewExpComponent,
    EditExpComponent,
    EducationComponent,
    NewEducationComponent,
    EditEducationComponent,
    HysComponent,
    EditSkillComponent,
    NewSkillComponent,
    AcercaDeComponent,
    EditAcercaDeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
