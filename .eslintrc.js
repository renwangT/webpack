module.exports = {
  // "no-undef": 0 时不用配置global，而由ts去校验是否声明
  /*
  globals: {
    ColorSchemeMode: true,
    IResources: true,
    GetObjectValue: true,
    SetParams: true,
    IReturnType: true,
    GetKeyOfValue: true,
    ErrorType: true,
    WebsocketEventMap: true,
    BayReturnType: true,
    IContainer: true,
    Columns: true,
    IBayRowRenderIndexInfo: true,
    IDeviceStatus: true,
    StopParams: true,
    PausedParams: true,
    IGetDeviceParams: true,
    JSX: true,
    React: true,
    NodeJS: true,
    Item: true,
    IGetContainerInfoParams: true,
    LContainerInfo: true,
    UContainerInfo: true,
    Status: true,
    QueueType: true,
    DamCodes: true,
    GradeIds: true,
    ColumnType: true,
    DangerInfo: true,
    ColorData: true,
    DeviceStatus: true,
    QueryLoginDeviceInfo: true,
    WindowBindProperty: true,
    WebsocketConnectMapData: true,
    DeviceType: true,
    DeviceTypeMap: true,
    ErrorCode: true,
    BASE_URL: true,
    VERSION: true,
    IDeviceNotifyRes: true,
    NotifyType: true,
    InaimType: true,
    StopWorkType: true
  },
  */
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "standard",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "prettier"],

  rules: {
    "spaced-comment": ["error", "always"],
    "linebreak-style": [0, "error", "windows"],
    semi: [2, "never"],
    "no-labels": ["error", { allowLoop: true }],
    "no-useless-escape": 0,
    "no-unused-vars": 2,
    "@typescript-eslint/no-unused-vars": 0,
    "no-console": 0,
    "no-empty": 2,
    "comma-dangle": [2, "never"],
    "no-const-assign": 2,
    "no-dupe-class-members": 2,
    "no-duplicate-case": 2,
    "no-extra-parens": 2,
    "no-self-compare": 2,
    "accessor-pairs": 2,
    "no-undef": 0,
    "comma-spacing": [
      2,
      {
        before: false,
        after: true
      }
    ],
    "constructor-super": 2,
    "new-cap": [
      2,
      {
        newIsCap: true,
        capIsNew: true
      }
    ],
    "new-parens": 2,
    "no-array-constructor": 2,
    "no-class-assign": 2,
    "no-cond-assign": 2
  }
}
