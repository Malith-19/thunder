const require_rolldown_runtime = require('./_virtual/rolldown_runtime.cjs');
const require_ThunderIDContext = require('./contexts/ThunderID/ThunderIDContext.cjs');
const require_useBrowserUrl = require('./hooks/useBrowserUrl.cjs');
const require_getAllOrganizations = require('./api/getAllOrganizations.cjs');
const require_getMeOrganizations = require('./api/getMeOrganizations.cjs');
const require_BrandingContext = require('./contexts/Branding/BrandingContext.cjs');
const require_BrandingProvider = require('./contexts/Branding/BrandingProvider.cjs');
const require_FlowContext = require('./contexts/Flow/FlowContext.cjs');
const require_FlowProvider = require('./contexts/Flow/FlowProvider.cjs');
const require_I18nContext = require('./contexts/I18n/I18nContext.cjs');
const require_useI18n = require('./contexts/I18n/useI18n.cjs');
const require_useThunderID = require('./contexts/ThunderID/useThunderID.cjs');
const require_FlowMetaProvider = require('./contexts/FlowMeta/FlowMetaProvider.cjs');
const require_I18nProvider = require('./contexts/I18n/I18nProvider.cjs');
const require_OrganizationProvider = require('./contexts/Organization/OrganizationProvider.cjs');
const require_useBrandingContext = require('./contexts/Branding/useBrandingContext.cjs');
const require_ThemeContext = require('./contexts/Theme/ThemeContext.cjs');
const require_ThemeProvider = require('./contexts/Theme/ThemeProvider.cjs');
const require_UserContext = require('./contexts/User/UserContext.cjs');
const require_UserProvider = require('./contexts/User/UserProvider.cjs');
const require_ThunderIDProvider = require('./contexts/ThunderID/ThunderIDProvider.cjs');
const require_useUser = require('./contexts/User/useUser.cjs');
const require_useOrganization = require('./contexts/Organization/useOrganization.cjs');
const require_useFlow = require('./contexts/Flow/useFlow.cjs');
const require_useTheme = require('./contexts/Theme/useTheme.cjs');
const require_useTranslation = require('./hooks/useTranslation.cjs');
const require_useForm = require('./hooks/useForm.cjs');
const require_useBranding = require('./hooks/useBranding.cjs');
const require_Spinner = require('./components/primitives/Spinner/Spinner.cjs');
const require_Button = require('./components/primitives/Button/Button.cjs');
const require_BaseSignInButton = require('./components/actions/SignInButton/BaseSignInButton.cjs');
const require_SignInButton = require('./components/actions/SignInButton/SignInButton.cjs');
const require_BaseSignOutButton = require('./components/actions/SignOutButton/BaseSignOutButton.cjs');
const require_SignOutButton = require('./components/actions/SignOutButton/SignOutButton.cjs');
const require_BaseSignUpButton = require('./components/actions/SignUpButton/BaseSignUpButton.cjs');
const require_SignUpButton = require('./components/actions/SignUpButton/SignUpButton.cjs');
const require_SignedIn = require('./components/control/SignedIn.cjs');
const require_SignedOut = require('./components/control/SignedOut.cjs');
const require_Loading = require('./components/control/Loading.cjs');
const require_OrganizationContext = require('./components/control/OrganizationContext/OrganizationContext.cjs');
const require_Typography = require('./components/primitives/Typography/Typography.cjs');
const require_FormControl = require('./components/primitives/FormControl/FormControl.cjs');
const require_InputLabel = require('./components/primitives/InputLabel/InputLabel.cjs');
const require_Checkbox = require('./components/primitives/Checkbox/Checkbox.cjs');
const require_DatePicker = require('./components/primitives/DatePicker/DatePicker.cjs');
const require_OtpField = require('./components/primitives/OtpField/OtpField.cjs');
const require_Eye = require('./components/primitives/Icons/Eye.cjs');
const require_EyeOff = require('./components/primitives/Icons/EyeOff.cjs');
const require_TextField = require('./components/primitives/TextField/TextField.cjs');
const require_PasswordField = require('./components/primitives/PasswordField/PasswordField.cjs');
const require_Select = require('./components/primitives/Select/Select.cjs');
const require_FieldFactory = require('./components/factories/FieldFactory.cjs');
const require_EmailOtp = require('./components/presentation/auth/SignIn/v1/options/EmailOtp.cjs');
const require_IdentifierFirst = require('./components/presentation/auth/SignIn/v1/options/IdentifierFirst.cjs');
const require_MultiOptionButton = require('./components/presentation/auth/SignIn/v1/options/MultiOptionButton.cjs');
const require_SmsOtp = require('./components/presentation/auth/SignIn/v1/options/SmsOtp.cjs');
const require_SocialButton = require('./components/presentation/auth/SignIn/v1/options/SocialButton.cjs');
const require_Totp = require('./components/presentation/auth/SignIn/v1/options/Totp.cjs');
const require_UsernamePassword = require('./components/presentation/auth/SignIn/v1/options/UsernamePassword.cjs');
const require_FacebookButton = require('./components/adapters/FacebookButton.cjs');
const require_GitHubButton = require('./components/adapters/GitHubButton.cjs');
const require_GoogleButton = require('./components/adapters/GoogleButton.cjs');
const require_LinkedInButton = require('./components/adapters/LinkedInButton.cjs');
const require_MicrosoftButton = require('./components/adapters/MicrosoftButton.cjs');
const require_SignInWithEthereumButton = require('./components/adapters/SignInWithEthereumButton.cjs');
const require_SignInOptionFactory = require('./components/presentation/auth/SignIn/v1/options/SignInOptionFactory.cjs');
const require_CircleAlert = require('./components/primitives/Icons/CircleAlert.cjs');
const require_CircleCheck = require('./components/primitives/Icons/CircleCheck.cjs');
const require_Info = require('./components/primitives/Icons/Info.cjs');
const require_TriangleAlert = require('./components/primitives/Icons/TriangleAlert.cjs');
const require_Alert = require('./components/primitives/Alert/Alert.cjs');
const require_Card = require('./components/primitives/Card/Card.cjs');
const require_Divider = require('./components/primitives/Divider/Divider.cjs');
const require_Logo = require('./components/primitives/Logo/Logo.cjs');
const require_OrganizationUnitPicker = require('./components/presentation/auth/OrganizationUnitPicker/v2/OrganizationUnitPicker.cjs');
const require_Toggle = require('./components/primitives/Toggle/Toggle.cjs');
const require_ConsentCheckboxList = require('./components/adapters/ConsentCheckboxList.cjs');
const require_Consent = require('./components/adapters/Consent.cjs');
const require_FlowTimer = require('./components/adapters/FlowTimer.cjs');
const require_BaseSignIn = require('./components/presentation/auth/SignIn/BaseSignIn.cjs');
const require_SignIn = require('./components/presentation/auth/SignIn/SignIn.cjs');
const require_BaseSignUp = require('./components/presentation/auth/SignUp/BaseSignUp.cjs');
const require_SignUp = require('./components/presentation/auth/SignUp/SignUp.cjs');
const require_BaseRecovery = require('./components/presentation/auth/Recovery/BaseRecovery.cjs');
const require_Recovery = require('./components/presentation/auth/Recovery/Recovery.cjs');
const require_BaseInviteUser = require('./components/presentation/auth/InviteUser/v2/BaseInviteUser.cjs');
const require_InviteUser = require('./components/presentation/auth/InviteUser/v2/InviteUser.cjs');
const require_BaseAcceptInvite = require('./components/presentation/auth/AcceptInvite/v2/BaseAcceptInvite.cjs');
const require_AcceptInvite = require('./components/presentation/auth/AcceptInvite/v2/AcceptInvite.cjs');
const require_TokenCallback = require('./components/auth/Callback/TokenCallback.cjs');
const require_OAuthCallback = require('./components/auth/Callback/OAuthCallback.cjs');
const require_Callback = require('./components/auth/Callback/Callback.cjs');
const require_BaseUser = require('./components/presentation/User/BaseUser.cjs');
const require_User = require('./components/presentation/User/User.cjs');
const require_BaseOrganization = require('./components/presentation/Organization/BaseOrganization.cjs');
const require_Organization = require('./components/presentation/Organization/Organization.cjs');
const require_LogOut = require('./components/primitives/Icons/LogOut.cjs');
const require_User$1 = require('./components/primitives/Icons/User.cjs');
const require_MultiInput = require('./components/primitives/MultiInput/MultiInput.cjs');
const require_BaseUserProfile = require('./components/presentation/UserProfile/BaseUserProfile.cjs');
const require_updateMeProfile = require('./api/updateMeProfile.cjs');
const require_UserProfile = require('./components/presentation/UserProfile/UserProfile.cjs');
const require_BaseUserDropdown = require('./components/presentation/UserDropdown/BaseUserDropdown.cjs');
const require_UserDropdown = require('./components/presentation/UserDropdown/UserDropdown.cjs');
const require_BaseOrganizationSwitcher = require('./components/presentation/OrganizationSwitcher/BaseOrganizationSwitcher.cjs');
const require_BuildingAlt = require('./components/primitives/Icons/BuildingAlt.cjs');
const require_BaseCreateOrganization = require('./components/presentation/CreateOrganization/BaseCreateOrganization.cjs');
const require_createOrganization = require('./api/createOrganization.cjs');
const require_CreateOrganization = require('./components/presentation/CreateOrganization/CreateOrganization.cjs');
const require_BaseOrganizationList = require('./components/presentation/OrganizationList/BaseOrganizationList.cjs');
const require_OrganizationList = require('./components/presentation/OrganizationList/OrganizationList.cjs');
const require_KeyValueInput = require('./components/primitives/KeyValueInput/KeyValueInput.cjs');
const require_BaseOrganizationProfile = require('./components/presentation/OrganizationProfile/BaseOrganizationProfile.cjs');
const require_getOrganization = require('./api/getOrganization.cjs');
const require_updateOrganization = require('./api/updateOrganization.cjs');
const require_OrganizationProfile = require('./components/presentation/OrganizationProfile/OrganizationProfile.cjs');
const require_OrganizationSwitcher = require('./components/presentation/OrganizationSwitcher/OrganizationSwitcher.cjs');
const require_BaseLanguageSwitcher = require('./components/presentation/LanguageSwitcher/BaseLanguageSwitcher.cjs');
const require_LanguageSwitcher = require('./components/presentation/LanguageSwitcher/LanguageSwitcher.cjs');
const require_getSchemas = require('./api/getSchemas.cjs');
const require_getScim2Me = require('./api/getScim2Me.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

exports.AcceptInvite = require_AcceptInvite.default;
exports.Alert = require_Alert.default;
exports.BaseAcceptInvite = require_BaseAcceptInvite.default;
exports.BaseCreateOrganization = require_BaseCreateOrganization.BaseCreateOrganization;
exports.BaseInviteUser = require_BaseInviteUser.default;
exports.BaseLanguageSwitcher = require_BaseLanguageSwitcher.default;
exports.BaseOrganization = require_BaseOrganization.default;
exports.BaseOrganizationList = require_BaseOrganizationList.default;
exports.BaseOrganizationProfile = require_BaseOrganizationProfile.default;
exports.BaseOrganizationSwitcher = require_BaseOrganizationSwitcher.default;
exports.BaseRecovery = require_BaseRecovery.default;
exports.BaseSignIn = require_BaseSignIn.default;
exports.BaseSignInButton = require_BaseSignInButton.default;
exports.BaseSignOutButton = require_BaseSignOutButton.default;
exports.BaseSignUp = require_BaseSignUp.default;
exports.BaseSignUpButton = require_BaseSignUpButton.default;
exports.BaseUser = require_BaseUser.default;
exports.BaseUserDropdown = require_BaseUserDropdown.default;
exports.BaseUserProfile = require_BaseUserProfile.default;
exports.BrandingContext = require_BrandingContext.default;
exports.BrandingProvider = require_BrandingProvider.default;
exports.BuildingAlt = require_BuildingAlt.default;
exports.Button = require_Button.default;
exports.Callback = require_Callback.Callback;
exports.Card = require_Card.default;
exports.Checkbox = require_Checkbox.default;
exports.CircleAlert = require_CircleAlert.default;
exports.CircleCheck = require_CircleCheck.default;
exports.Consent = require_Consent.default;
exports.ConsentCheckboxList = require_ConsentCheckboxList.default;
exports.CreateOrganization = require_CreateOrganization.CreateOrganization;
exports.DatePicker = require_DatePicker.default;
exports.Divider = require_Divider.default;
Object.defineProperty(exports, 'EMOJI_URI_SCHEME', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.EMOJI_URI_SCHEME;
  }
});
exports.EmailOtp = require_EmailOtp.default;
Object.defineProperty(exports, 'EmbeddedFlowActionVariant', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.EmbeddedFlowActionVariantV2;
  }
});
Object.defineProperty(exports, 'EmbeddedFlowComponentType', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.EmbeddedFlowComponentTypeV2;
  }
});
Object.defineProperty(exports, 'EmbeddedFlowEventType', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.EmbeddedFlowEventTypeV2;
  }
});
Object.defineProperty(exports, 'EmbeddedFlowTextVariant', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.EmbeddedFlowTextVariantV2;
  }
});
Object.defineProperty(exports, 'EmbeddedRecoveryFlowStatus', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.EmbeddedRecoveryFlowStatusV2;
  }
});
Object.defineProperty(exports, 'EmbeddedRecoveryFlowType', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.EmbeddedRecoveryFlowTypeV2;
  }
});
Object.defineProperty(exports, 'EmbeddedSignInFlowStatus', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.EmbeddedSignInFlowStatusV2;
  }
});
Object.defineProperty(exports, 'EmbeddedSignInFlowType', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.EmbeddedSignInFlowTypeV2;
  }
});
exports.Eye = require_Eye.default;
exports.EyeOff = require_EyeOff.default;
exports.FacebookButton = require_FacebookButton.default;
exports.FieldFactory = require_FieldFactory.FieldFactory;
exports.FlowContext = require_FlowContext.default;
exports.FlowMetaProvider = require_FlowMetaProvider.default;
exports.FlowProvider = require_FlowProvider.default;
exports.FlowTimer = require_FlowTimer.default;
exports.FormControl = require_FormControl.default;
exports.GitHubButton = require_GitHubButton.default;
exports.GoogleButton = require_GoogleButton.default;
exports.I18nContext = require_I18nContext.default;
exports.I18nProvider = require_I18nProvider.default;
exports.IdentifierFirst = require_IdentifierFirst.default;
exports.Info = require_Info.default;
exports.InputLabel = require_InputLabel.default;
exports.InviteUser = require_InviteUser.default;
exports.KeyValueInput = require_KeyValueInput.default;
exports.LanguageSwitcher = require_LanguageSwitcher.default;
exports.LinkedInButton = require_LinkedInButton.default;
exports.Loading = require_Loading.default;
exports.LogOut = require_LogOut.default;
exports.Logo = require_Logo.default;
exports.MicrosoftButton = require_MicrosoftButton.default;
exports.MultiInput = require_MultiInput.default;
exports.MultiOptionButton = require_MultiOptionButton.default;
exports.OAuthCallback = require_OAuthCallback.OAuthCallback;
exports.Organization = require_Organization.default;
exports.OrganizationContext = require_OrganizationContext.default;
exports.OrganizationList = require_OrganizationList.default;
exports.OrganizationProfile = require_OrganizationProfile.default;
exports.OrganizationProvider = require_OrganizationProvider.default;
exports.OrganizationSwitcher = require_OrganizationSwitcher.default;
exports.OrganizationUnitPicker = require_OrganizationUnitPicker.default;
exports.OtpField = require_OtpField.default;
exports.PasswordField = require_PasswordField.default;
exports.Recovery = require_Recovery.default;
exports.Select = require_Select.default;
exports.SignIn = require_SignIn.default;
exports.SignInButton = require_SignInButton.default;
exports.SignInWithEthereumButton = require_SignInWithEthereumButton.default;
exports.SignOutButton = require_SignOutButton.default;
exports.SignUp = require_SignUp.default;
exports.SignUpButton = require_SignUpButton.default;
exports.SignedIn = require_SignedIn.default;
exports.SignedOut = require_SignedOut.default;
exports.SmsOtp = require_SmsOtp.default;
exports.SocialButton = require_SocialButton.default;
exports.Spinner = require_Spinner.default;
exports.TextField = require_TextField.default;
exports.ThemeContext = require_ThemeContext.default;
exports.ThemeProvider = require_ThemeProvider.default;
exports.ThunderIDContext = require_ThunderIDContext.default;
exports.ThunderIDProvider = require_ThunderIDProvider.default;
Object.defineProperty(exports, 'ThunderIDRuntimeError', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.ThunderIDRuntimeError;
  }
});
exports.Toggle = require_Toggle.default;
exports.TokenCallback = require_TokenCallback.TokenCallback;
exports.Totp = require_Totp.default;
exports.TriangleAlert = require_TriangleAlert.default;
exports.Typography = require_Typography.default;
exports.User = require_User.default;
exports.UserContext = require_UserContext.default;
exports.UserDropdown = require_UserDropdown.default;
exports.UserIcon = require_User$1.default;
exports.UserProfile = require_UserProfile.default;
exports.UserProvider = require_UserProvider.default;
exports.UsernamePassword = require_UsernamePassword.default;
Object.defineProperty(exports, 'countryCodeToFlagEmoji', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.countryCodeToFlagEmoji;
  }
});
exports.createField = require_FieldFactory.createField;
exports.createOrganization = require_createOrganization.default;
exports.createPatchOperations = __thunderid_browser.createPatchOperations;
exports.createSignInOption = require_SignInOptionFactory.createSignInOption;
exports.createSignInOptionFromAuthenticator = require_SignInOptionFactory.createSignInOptionFromAuthenticator;
Object.defineProperty(exports, 'extractEmojiFromUri', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.extractEmojiFromUri;
  }
});
Object.defineProperty(exports, 'getActiveTheme', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.getActiveTheme;
  }
});
exports.getAllOrganizations = require_getAllOrganizations.default;
exports.getConsentOptionalKey = require_ConsentCheckboxList.getConsentOptionalKey;
exports.getMeOrganizations = require_getMeOrganizations.default;
exports.getMeProfile = require_getScim2Me.default;
exports.getOrganization = require_getOrganization.default;
exports.getSchemas = require_getSchemas.default;
Object.defineProperty(exports, 'http', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.http;
  }
});
Object.defineProperty(exports, 'isEmojiUri', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.isEmojiUri;
  }
});
Object.defineProperty(exports, 'navigate', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.navigate;
  }
});
Object.defineProperty(exports, 'resolveEmojiUrisInHtml', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.resolveEmojiUrisInHtml;
  }
});
Object.defineProperty(exports, 'resolveFlowTemplateLiterals', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.resolveFlowTemplateLiterals;
  }
});
Object.defineProperty(exports, 'resolveLocaleDisplayName', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.resolveLocaleDisplayName;
  }
});
Object.defineProperty(exports, 'resolveLocaleEmoji', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.resolveLocaleEmoji;
  }
});
Object.defineProperty(exports, 'resolveMeta', {
  enumerable: true,
  get: function () {
    return __thunderid_browser.resolveMeta;
  }
});
exports.updateMeProfile = require_updateMeProfile.default;
exports.updateOrganization = require_updateOrganization.default;
exports.useBranding = require_useBranding.default;
exports.useBrandingContext = require_useBrandingContext.default;
exports.useBrowserUrl = require_useBrowserUrl.default;
exports.useFlow = require_useFlow.default;
exports.useForm = require_useForm.default;
exports.useI18n = require_useI18n.default;
exports.useOrganization = require_useOrganization.default;
exports.useTheme = require_useTheme.default;
exports.useThunderID = require_useThunderID.default;
exports.useTranslation = require_useTranslation.default;
exports.useUser = require_useUser.default;
exports.validateFieldValue = require_FieldFactory.validateFieldValue;