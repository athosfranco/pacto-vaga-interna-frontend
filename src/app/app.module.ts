import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular Material Components
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './component/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './component/register/register.component';

//Modulos de config de datas
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterSuccessDialogComponent } from './component/register-success-dialog/register-success-dialog.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { UserPanelPageComponent } from './pages/user-panel-page/user-panel-page.component';
import { AdminPanelPageComponent } from './pages/admin-panel-page/admin-panel-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { RedirectComponent } from './component/redirect/redirect.component';
import { LogoutDialogComponent } from './component/logout-dialog/logout-dialog.component';

import { JobsPageComponent } from './pages/jobs-page/jobs-page.component';
import { JobCardComponent } from './component/job-card/job-card.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';

import { ConfirmApplicationDialogComponent } from './component/confirm-application-dialog/confirm-application-dialog.component';
import { JobApplicationCardComponent } from './component/job-application-card/job-application-card.component';
import { JobApplicationListComponent } from './component/job-application-list/job-application-list.component';
import { JobApplicationDetailsPageComponent } from './pages/job-application-details-page/job-application-details-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotificationButtonComponent } from './component/notification-button/notification-button.component';
import { NotificationDialogComponent } from './component/notification-dialog/notification-dialog.component';
import { EmptyResultImgComponent } from './component/empty-result-img/empty-result-img.component';
import { ReviewApplicationListComponent } from './component/review-application-list/review-application-list.component';

import { CreateJobPageComponent } from './pages/create-job-page/create-job-page.component';
import { ConfirmJobCreationDialogComponent } from './component/confirm-job-creation-dialog/confirm-job-creation-dialog.component';
import { ConfirmJobExclusionDialogComponent } from './component/confirm-job-exclusion-dialog/confirm-job-exclusion-dialog.component';
import { EditJobPageComponent } from './pages/edit-job-page/edit-job-page.component';

import { UpdateJobApplicationDialogComponent } from './component/update-job-application-dialog/update-job-application-dialog.component';
import { SkillsPageComponent } from './pages/skills-page/skills-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPageComponent,
    DashboardPageComponent,
    RegisterComponent,
    RegisterPageComponent,
    RegisterSuccessDialogComponent,
    TopbarComponent,
    SidebarComponent,
    UserPanelPageComponent,
    AdminPanelPageComponent,
    UnauthorizedPageComponent,
    RedirectComponent,
    LogoutDialogComponent,
    JobsPageComponent,
    JobCardComponent,
    JobDetailsPageComponent,
    ConfirmApplicationDialogComponent,
    JobApplicationCardComponent,
    JobApplicationListComponent,
    JobApplicationDetailsPageComponent,
    ProfilePageComponent,
    NotificationButtonComponent,
    NotificationDialogComponent,
    EmptyResultImgComponent,
    ReviewApplicationListComponent,
    EditJobPageComponent,

    CreateJobPageComponent,
    ConfirmJobCreationDialogComponent,
    ConfirmJobExclusionDialogComponent,
    UpdateJobApplicationDialogComponent,
    SkillsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatBadgeModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
