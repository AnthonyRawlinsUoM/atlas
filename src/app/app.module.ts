import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuiModule, SuiModalService, SuiCheckboxModule } from 'ng2-semantic-ui';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChartModule} from 'angular2-chartjs';
import { Ng5SliderModule } from 'ng5-slider';

import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';

import { ReactiveService } from './reactive.service';
import { DisclaimerService } from './disclaimer.service';
import { AuthService } from './auth.service';
import { WeightsService } from './weights.service';
import { CookieService } from 'ngx-cookie-service';
import { ShortcutService } from './shortcut.service';
import { TeamService } from './team.service';
import { ValidatorService } from './validator.service';
import { MailerService } from './mailer.service';
import { UxOptionService } from './ux-option.service';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { PublicationsComponent } from './publications/publications.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ComparatorComponent } from './comparator/comparator.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { ExternalApiComponent } from './external-api/external-api.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DetailedMapComponent } from './detailed-map/detailed-map.component';
import { StudyAreasComponent } from './study-areas/study-areas.component';

import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { StudyAreaWindowComponent } from './study-area-window/study-area-window.component';
import { StudyToolbarComponent } from './study-toolbar/study-toolbar.component';
import { NgProgressModule } from '@ngx-progressbar/core';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';
import { MatrixSelectorComponent } from './matrix-selector/matrix-selector.component';
import { MatrixCellComponent } from './matrix-selector/matrix-cell/matrix-cell.component';
import { MatrixHeaderCellComponent } from './matrix-selector/matrix-header-cell/matrix-header-cell.component';
import { MatrixSelectionComponent } from './matrix-selector/matrix-selection/matrix-selection.component';
import { SelectedItemComponent } from './matrix-selector/selected-item/selected-item.component';
import { ScopeOptionComponent } from './matrix-selector/scope-option/scope-option.component';
import { LegendComponent } from './matrix-selector/legend/legend.component';
import { SpiderchartComponent } from './spiderchart/spiderchart.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { CellHighlightComponent } from './matrix-selector/cell-highlight/cell-highlight.component';
import { InformationComponent } from './information/information.component';
import { FaqComponent } from './faq/faq.component';
import { ShortcutsComponent } from './shortcuts/shortcuts.component';
import { MapviewComponent } from './mapview/mapview.component';
import { TeamMemberComponent } from './teammember/teammember.component';
import { TeampageComponent } from './teampage/teampage.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ContactComponent } from './contact/contact.component';
import { FetchJsonPipe } from './fetch-json.pipe';
import { CitationHarvardComponent } from './citation-harvard/citation-harvard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { IframeComponent } from './iframe/iframe.component';
import { HelpComponent } from './help/help.component';

import { SafePipe } from './safe.pipe';
import { CandlestickComponent } from './candlestick/candlestick.component';
import { ViolinplotComponent } from './violinplot/violinplot.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { HighlightDirective } from './highlight.directive';
import { CostComparatorComponent } from './cost-comparator/cost-comparator.component';
import { InterpretationComponent } from './interpretation/interpretation.component';
import { CostOptionComponent } from './cost-option/cost-option.component';
import { ClimateOptionComponent } from './climate-option/climate-option.component';
import { MapLegendComponent } from './map-legend/map-legend.component';
import { CoverComponent } from './publications/cover/cover.component';
import { PlayerComponent } from './help/player/player.component';
import { UxOptionsComponent } from './ux-options/ux-options.component';
import { TopicsComponent } from './help/topics/topics.component';
import { TopicComponent } from './help/topic/topic.component';
import { VideoComponent } from './help/topic/video/video.component';

const config: SocketIoConfig = { url: 'https://prescribedburnatlas.science/', options: {} };
// const config: SocketIoConfig = { url: 'http://localhost:4200', options: {} };

const routes: Routes = [
    { path: 'callback', component: CallbackComponent },
    { path: 'about', component: AboutComponent, data: { state: 'about' } },
    { path: 'team', component: TeampageComponent, data: { state: 'team' } },
    // {
    //     path: 'profile', component: ProfileComponent,
    //     canActivate: [AuthGuard], data: { state: 'profile' }
    // },
    {
        path: 'contact', component: ContactComponent,
        data: { state: 'contact' }
    },
    // {
    //     path: 'external-api',
    //     component: ExternalApiComponent,
    //     canActivate: [AuthGuard]
    // },
    { path: 'faq', component: FaqsComponent, data: { state: 'faq' } },

    { path: 'help', component: HelpComponent, data: {state: 'help'} },

    { path: 'publications', component: PublicationsComponent, data: { state: 'publications' } },
    { path: 'disclaimer', component: DisclaimerComponent, data: {state: 'disclaimer'}},
    {
        path: 'home', component: StudyAreasComponent,
        canActivate: [AuthGuard],
        data: { state: 'home' }
    },
    {
        path: '', component: StudyAreasComponent,
        canActivate: [AuthGuard],
        data: { state: 'studies' }
    },
    { path: '**', component: PageNotFoundComponent, data: { state: '404' } }];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DisclaimerComponent,
        PageNotFoundComponent,
        AboutComponent,
        TeamComponent,
        PublicationsComponent,
        FaqsComponent,
        ComparatorComponent,
        CallbackComponent,
        ProfileComponent,
        ExternalApiComponent,
        FooterComponent,
        ConfirmationComponent,
        DetailedMapComponent,
        StudyAreasComponent,
        ModalConfirmComponent,
        StudyAreaWindowComponent,
        StudyToolbarComponent,
        MatrixSelectorComponent,
        MatrixCellComponent,
        MatrixHeaderCellComponent,
        MatrixSelectionComponent,
        SelectedItemComponent,
        ScopeOptionComponent,
        LegendComponent,
        SpiderchartComponent,
        SandboxComponent,
        CellHighlightComponent,
        InformationComponent,
        FaqComponent,
        ShortcutsComponent,
        MapviewComponent,
        TeamMemberComponent,
        TeampageComponent,
        ContactFormComponent,
        ContactComponent,
        FetchJsonPipe,
        CitationHarvardComponent,
        WelcomeComponent,
        IframeComponent,
        SafePipe,
        HelpComponent,
        CandlestickComponent,
        ViolinplotComponent,
        TreatmentComponent,
        HighlightDirective,
        CostComparatorComponent,
        InterpretationComponent,
        CostOptionComponent,
        ClimateOptionComponent,
        MapLegendComponent,
        CoverComponent,
        PlayerComponent,
        UxOptionsComponent,
        TopicsComponent,
        TopicComponent,
        VideoComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SuiModule,
        HttpClientModule,
        jqxChartModule,
        NgProgressModule,
        DragDropModule,
        ChartModule,
        Ng5SliderModule,
       VgCoreModule,
       VgControlsModule,
       VgOverlayPlayModule,
       VgBufferingModule,
        SocketIoModule.forRoot(config),
        NgxMapboxGLModule.withConfig({
            accessToken: 'pk.eyJ1IjoiYW50aG9ueXJhd2xpbnN1b20iLCJhIjoiY2o1dm81NTIwMDN6MTJxbjlvOHBiNHdlOSJ9.lt8I4sU0ceA6N8Tnnmx2ig', // Optionnal, can also be set per map (accessToken input of mgl-map)
            geocoderAccessToken: 'pk.eyJ1IjoiYW50aG9ueXJhd2xpbnN1b20iLCJhIjoiY2o1dm81NTIwMDN6MTJxbjlvOHBiNHdlOSJ9.lt8I4sU0ceA6N8Tnnmx2ig' // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
        }),
        RouterModule.forRoot(routes, {
            anchorScrolling: 'enabled'
        })
    ],
    providers: [
        ReactiveService,
        DisclaimerService,
        CookieService,
        SuiModalService,
        WeightsService,
        ShortcutService,
        TeamService,
        ValidatorService,
        MailerService,
        UxOptionService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        }
    ],
    entryComponents: [ModalConfirmComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
