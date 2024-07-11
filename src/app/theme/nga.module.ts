import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

// Limitng
import { AltBuyukKartComponent } from 'limitng/alt-buyuk-kart';
import { AltKucukKartComponent } from 'limitng/alt-kucuk-kart';
import { DikeyBaslikliPanelComponent } from 'limitng/dikey-baslikli-panel';
import { DikeyBaslikliPanelSolComponent } from 'limitng/dikey-baslikli-panel-sol';
import { AdAlaniDirective } from 'limitng/directives/adAlani.directive';
import { AdresAlaniDirective } from 'limitng/directives/adresAlani.directive';
import { BuyukHarfDirective } from 'limitng/directives/buyukHarf.directive';
import { CiftBoslukTekDirective } from 'limitng/directives/ciftBoslukTek.directive';
import { DisableDirective } from 'limitng/directives/disable.directive';
import { FlexBasisDirectiveModule } from 'limitng/directives/flexBasis.directive';
import { IlkHarfBuyukDirective } from 'limitng/directives/ilkHarfBuyuk.directive';
import { KodAlaniDirective } from 'limitng/directives/kodAlani.directive';
import { MaksimumUzunlukDirective } from 'limitng/directives/maksimumUzunluk.directive';
import { SagSolBoslukSilDirective } from 'limitng/directives/sagSolBoslukSil.directive';
import { StandartAlanDirective } from 'limitng/directives/standartAlan.directive';
import { SutunGenisligiDirectiveModule } from 'limitng/directives/sutunGenisligi.directive';
import { TumBoslukSilDirective } from 'limitng/directives/tumBoslukSil.directive';
import { TumIlkHarfBuyukDirective } from 'limitng/directives/tumIlkHarfBuyuk.directive';
import { FiltreBarComponent } from 'limitng/filtre-bar';
import { BoolToPlusPipe } from 'limitng/pipes/boolToPlus.pipe';
import { BoolToPlusMinusPipe } from 'limitng/pipes/boolToPlusMinus.pipe';
import { DateToTextPipe } from 'limitng/pipes/dateToText.pipe';
import { EvetHayirPipe } from 'limitng/pipes/evetHayir.pipe';
import { SafePipe } from 'limitng/pipes/safe.pipe';
import { RaporKartComponent } from 'limitng/rapor-kart';
import { SolBuyukKartComponent } from 'limitng/sol-buyuk-kart';
import { SolKucukKartComponent } from 'limitng/sol-kucuk-kart';
import { YatayBaslikliPanelComponent } from 'limitng/yatay-baslikli-panel';

// Primeng
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { BlockUIModule } from 'primeng/blockui';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FocusTrapModule } from 'primeng/focustrap';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

import { BaBackTopComponent } from './components/baBackTop/baBackTop.component';
import { BaContentTopComponent } from './components/baContentTop/baContentTop.component';
import { BaMenuComponent } from './components/baMenu/baMenu.component';
import { BaMenuItemComponent } from './components/baMenu/components/baMenuItem/baMenuItem.component';
import { BaPageTopComponent } from './components/baPageTop/baPageTop.component';
import { BaSidebarComponent } from './components/baSidebar/baSidebar.component';
import { BaScrollPositionDirective } from './directives/baScrollPosition/baScrollPosition.directive';
import { BaSlimScrollDirective } from './directives/baSlimScroll/baSlimScroll.directive';
import { ThemeDirective } from './directives/theme.directive';
import { EmailValidator } from './validators/email.validator';
import { EqualPasswordsValidator } from './validators/equalPasswords.validator';

const PRIMENG_COMPONENTS = [
  AccordionModule,
  AutoCompleteModule,
  BadgeModule,
  BlockUIModule,
  BreadcrumbModule,
  ButtonModule,
  CalendarModule,
  CardModule,
  CarouselModule,
  ChartModule,
  ChipsModule,
  ChipModule,
  CheckboxModule,
  ColorPickerModule,
  ConfirmDialogModule,
  DataViewModule,
  DialogModule,
  DividerModule,
  DragDropModule,
  DynamicDialogModule,
  DropdownModule,
  FieldsetModule,
  FileUploadModule,
  FocusTrapModule,
  GalleriaModule,
  ImageModule,
  InputGroupAddonModule,
  InputGroupModule,
  InputMaskModule,
  InputNumberModule,
  InputSwitchModule,
  InputTextModule,
  InputTextareaModule,
  KeyFilterModule,
  KnobModule,
  ListboxModule,
  MenuModule,
  MenubarModule,
  MessageModule,
  MessagesModule,
  MultiSelectModule,
  OrganizationChartModule,
  OverlayPanelModule,
  PanelModule,
  PickListModule,
  ProgressBarModule,
  PasswordModule,
  RadioButtonModule,
  ScrollPanelModule,
  SelectButtonModule,
  SidebarModule,
  SliderModule,
  SlideMenuModule,
  SpinnerModule,
  SpeedDialModule,
  SplitButtonModule,
  StepsModule,
  TagModule,
  TabMenuModule,
  TabViewModule,
  TableModule,
  TimelineModule,
  ToastModule,
  ToggleButtonModule,
  ToolbarModule,
  TooltipModule,
  TreeModule,
  TreeTableModule,
  TreeSelectModule,
  TriStateCheckboxModule
];

const LIMITNG_COMPONENTS = [
  AltBuyukKartComponent,
  AltKucukKartComponent,
  DikeyBaslikliPanelComponent,
  DikeyBaslikliPanelSolComponent,
  RaporKartComponent,
  SolBuyukKartComponent,
  SolKucukKartComponent,
  YatayBaslikliPanelComponent,
  FiltreBarComponent,
  DisableDirective,
  KodAlaniDirective,
  AdAlaniDirective,
  AdresAlaniDirective,
  StandartAlanDirective,
  BuyukHarfDirective,
  IlkHarfBuyukDirective,
  TumIlkHarfBuyukDirective,
  CiftBoslukTekDirective,
  TumBoslukSilDirective,
  SagSolBoslukSilDirective,
  MaksimumUzunlukDirective,
  SutunGenisligiDirectiveModule,
  FlexBasisDirectiveModule,
  BoolToPlusPipe,
  BoolToPlusMinusPipe,
  DateToTextPipe,
  EvetHayirPipe,
  SafePipe
];

const NGA_COMPONENTS = [
  BaBackTopComponent,
  BaContentTopComponent,
  BaMenuComponent,
  BaMenuItemComponent,
  BaPageTopComponent,
  BaSidebarComponent
];

const NGA_DIRECTIVES = [
  BaScrollPositionDirective,
  BaSlimScrollDirective,
  ThemeDirective
];

@NgModule({
  declarations: [
    ...NGA_COMPONENTS,
    ...NGA_DIRECTIVES
  ],
  imports: [
    FormsModule,
    LIMITNG_COMPONENTS,
    PRIMENG_COMPONENTS,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports: [
    ...NGA_COMPONENTS,
    ...NGA_DIRECTIVES,
    LIMITNG_COMPONENTS,
    PRIMENG_COMPONENTS
  ]
})

export class NgaModule {
  static forRoot(): ModuleWithProviders<NgaModule> {
    return {
      ngModule: NgaModule,
      providers: [
        EmailValidator,
        EqualPasswordsValidator
      ]
    };
  }
}
