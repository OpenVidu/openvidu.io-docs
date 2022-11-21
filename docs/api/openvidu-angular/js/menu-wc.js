'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">OpenVidu Angular Documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiDirectiveModule.html" data-type="entity-link" >ApiDirectiveModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ApiDirectiveModule-8246970a478df0e1bf0a1c783c312772cc56288ed1642524ae6d798e0f2e8d69998cb0321d8d4d849dc5b1b08ba4631fd73032f4e9f33a44912a0acfee8b0ea4"' : 'data-target="#xs-directives-links-module-ApiDirectiveModule-8246970a478df0e1bf0a1c783c312772cc56288ed1642524ae6d798e0f2e8d69998cb0321d8d4d849dc5b1b08ba4631fd73032f4e9f33a44912a0acfee8b0ea4"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ApiDirectiveModule-8246970a478df0e1bf0a1c783c312772cc56288ed1642524ae6d798e0f2e8d69998cb0321d8d4d849dc5b1b08ba4631fd73032f4e9f33a44912a0acfee8b0ea4"' :
                                        'id="xs-directives-links-module-ApiDirectiveModule-8246970a478df0e1bf0a1c783c312772cc56288ed1642524ae6d798e0f2e8d69998cb0321d8d4d849dc5b1b08ba4631fd73032f4e9f33a44912a0acfee8b0ea4"' }>
                                        <li class="link">
                                            <a href="directives/ActivitiesPanelRecordingActivityDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivitiesPanelRecordingActivityDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/AdminLoginDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminLoginDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/AdminRecordingsListDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminRecordingsListDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/AudioMutedDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AudioMutedDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CaptionsLangDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaptionsLangDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/LangDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LangDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/MinimalDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MinimalDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ParticipantNameDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParticipantNameDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ParticipantPanelItemMuteButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParticipantPanelItemMuteButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/PrejoinDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrejoinDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/RecordingActivityRecordingErrorDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecordingActivityRecordingErrorDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/RecordingActivityRecordingsListDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecordingActivityRecordingsListDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/StreamDisplayAudioDetectionDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StreamDisplayAudioDetectionDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/StreamDisplayParticipantNameDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StreamDisplayParticipantNameDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/StreamSettingsButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StreamSettingsButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarBackgroundEffectsButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarBackgroundEffectsButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarCaptionsButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarCaptionsButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarChatPanelButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarChatPanelButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarDisplayLogoDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarDisplayLogoDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarDisplaySessionNameDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarDisplaySessionNameDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarFullscreenButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarFullscreenButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarLeaveButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarLeaveButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarParticipantsPanelButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarParticipantsPanelButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarScreenshareButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarScreenshareButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarSettingsButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarSettingsButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/VideoMutedDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoMutedDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OpenViduAngularDirectiveModule.html" data-type="entity-link" >OpenViduAngularDirectiveModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-OpenViduAngularDirectiveModule-a188cf0a6615571d6f8b78f7939b3db0163aca31f9a3e1435f40932251b6fbb5736569fea79ff2ecd9b0a173f2d6ae488147aa0569edc20ea1a61085df9b1ae7"' : 'data-target="#xs-directives-links-module-OpenViduAngularDirectiveModule-a188cf0a6615571d6f8b78f7939b3db0163aca31f9a3e1435f40932251b6fbb5736569fea79ff2ecd9b0a173f2d6ae488147aa0569edc20ea1a61085df9b1ae7"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-OpenViduAngularDirectiveModule-a188cf0a6615571d6f8b78f7939b3db0163aca31f9a3e1435f40932251b6fbb5736569fea79ff2ecd9b0a173f2d6ae488147aa0569edc20ea1a61085df9b1ae7"' :
                                        'id="xs-directives-links-module-OpenViduAngularDirectiveModule-a188cf0a6615571d6f8b78f7939b3db0163aca31f9a3e1435f40932251b6fbb5736569fea79ff2ecd9b0a173f2d6ae488147aa0569edc20ea1a61085df9b1ae7"' }>
                                        <li class="link">
                                            <a href="directives/ActivitiesPanelDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivitiesPanelDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/AdditionalPanelsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdditionalPanelsDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ChatPanelDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatPanelDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/LayoutDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/PanelDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PanelDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ParticipantPanelItemDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParticipantPanelItemDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ParticipantPanelItemElementsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParticipantPanelItemElementsDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ParticipantsPanelDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParticipantsPanelDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/StreamDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StreamDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarAdditionalButtonsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarAdditionalButtonsDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarAdditionalPanelButtonsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarAdditionalPanelButtonsDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ToolbarDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OpenviduWebComponentModule.html" data-type="entity-link" >OpenviduWebComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OpenviduWebComponentModule-7b07143ffcc77d50da85931a79838d8fd4f649bcb99cc6b8a6945f2b82b43925e5cf3e86fae5ee589a07c99b9a838a7041d527f80e402531544def6699ee1db4"' : 'data-target="#xs-components-links-module-OpenviduWebComponentModule-7b07143ffcc77d50da85931a79838d8fd4f649bcb99cc6b8a6945f2b82b43925e5cf3e86fae5ee589a07c99b9a838a7041d527f80e402531544def6699ee1db4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OpenviduWebComponentModule-7b07143ffcc77d50da85931a79838d8fd4f649bcb99cc6b8a6945f2b82b43925e5cf3e86fae5ee589a07c99b9a838a7041d527f80e402531544def6699ee1db4"' :
                                            'id="xs-components-links-module-OpenviduWebComponentModule-7b07143ffcc77d50da85931a79838d8fd4f649bcb99cc6b8a6945f2b82b43925e5cf3e86fae5ee589a07c99b9a838a7041d527f80e402531544def6699ee1db4"' }>
                                            <li class="link">
                                                <a href="components/OpenviduWebComponentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpenviduWebComponentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ActivitiesPanelComponent.html" data-type="entity-link" >ActivitiesPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AdminDashboardComponent.html" data-type="entity-link" >AdminDashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AdminLoginComponent.html" data-type="entity-link" >AdminLoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChatPanelComponent.html" data-type="entity-link" >ChatPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutComponent.html" data-type="entity-link" >LayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PanelComponent.html" data-type="entity-link" >PanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ParticipantPanelItemComponent.html" data-type="entity-link" >ParticipantPanelItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ParticipantsPanelComponent.html" data-type="entity-link" >ParticipantsPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecordingActivityComponent.html" data-type="entity-link" >RecordingActivityComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StreamComponent.html" data-type="entity-link" >StreamComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ToolbarComponent.html" data-type="entity-link" >ToolbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VideoconferenceComponent.html" data-type="entity-link" >VideoconferenceComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ParticipantAbstractModel.html" data-type="entity-link" >ParticipantAbstractModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/OpenViduService.html" data-type="entity-link" >OpenViduService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PanelService.html" data-type="entity-link" >PanelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParticipantService.html" data-type="entity-link" >ParticipantService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecordingService.html" data-type="entity-link" >RecordingService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CaptionModel.html" data-type="entity-link" >CaptionModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PanelEvent.html" data-type="entity-link" >PanelEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParticipantProperties.html" data-type="entity-link" >ParticipantProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecordingInfo.html" data-type="entity-link" >RecordingInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StreamModel.html" data-type="entity-link" >StreamModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenModel.html" data-type="entity-link" >TokenModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#pipes-links"' :
                                'data-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/ParticipantStreamsPipe.html" data-type="entity-link" >ParticipantStreamsPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                        </ul>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});